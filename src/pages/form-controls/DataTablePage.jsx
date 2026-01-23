
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Search, Edit, Trash2, Plus, UserPlus, Briefcase } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// Mock Data for Employee Directory
const initialEmployees = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'Engineering', age: 'Senior Dev', salary: 95000, department: 'Active' },
  { id: 2, firstName: 'Sarah', lastName: 'Smith', email: 'Marketing', age: 'Manager', salary: 88000, department: 'Active' },
  { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'Sales', age: 'Representative', salary: 65000, department: 'On Leave' },
  { id: 4, firstName: 'Emily', lastName: 'Brown', email: 'HR', age: 'Director', salary: 110000, department: 'Active' },
  { id: 5, firstName: 'Alex', lastName: 'Wilson', email: 'Engineering', age: 'Junior Dev', salary: 60000, department: 'Active' },
  { id: 6, firstName: 'Jessica', lastName: 'Davis', email: 'Product', age: 'Owner', salary: 105000, department: 'Active' },
  { id: 7, firstName: 'David', lastName: 'Miller', email: 'Support', age: 'Lead', salary: 72000, department: 'Inactive' },
  { id: 8, firstName: 'Lisa', lastName: 'Anderson', email: 'Marketing', age: 'Specialist', salary: 58000, department: 'Active' },
  { id: 9, firstName: 'Robert', lastName: 'Taylor', email: 'Sales', age: 'Manager', salary: 92000, department: 'Active' },
  { id: 10, firstName: 'Jennifer', lastName: 'Thomas', email: 'Engineering', age: 'QA Engineer', salary: 75000, department: 'Active' }
];

export default function DataTablePage() {
  const [data, setData] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const rowsPerPage = 5;

  // Add/Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null); // null for add, object for edit

  const filteredData = data.filter(row =>
    row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase()) // Searching department mapped to email field
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDelete = (id) => {
    setData(prev => prev.filter(row => row.id !== id));
    toast({ title: 'Employee record deleted', variant: 'destructive' });
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentEmployee({ id: Date.now(), firstName: '', lastName: '', email: '', age: '', salary: '', department: 'Active' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEmployee = {
        id: currentEmployee.id,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'), // Department
        age: formData.get('age'), // Position
        salary: Number(formData.get('salary')),
        department: formData.get('department') // Status
    };

    if (data.some(d => d.id === newEmployee.id)) {
        setData(prev => prev.map(d => d.id === newEmployee.id ? newEmployee : d));
        toast({ title: 'Employee updated successfully' });
    } else {
        setData(prev => [...prev, newEmployee]);
        toast({ title: 'New employee added successfully' });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Employee Directory - UI Practice Hub</title>
        <meta name="description" content="Manage employee records in a data table" />
      </Helmet>

      <PageHeader title="Employee Directory" subtitle="Search and manage employee records" />

      <div className="bg-card border rounded-lg p-6 shadow-sm" data-testid="section-table-container">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative flex-1 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Name or Dept..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
              data-testid="input-search-table"
            />
          </div>
          <Button className="gap-2 w-full sm:w-auto" onClick={handleAdd} data-testid="button-add-record">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full" data-testid="table-web-tables">
            <thead className="bg-muted/50">
              <tr className="border-b">
                <th scope="col" className="text-left p-4 font-medium text-muted-foreground">Full Name</th>
                <th scope="col" className="text-left p-4 font-medium text-muted-foreground">Department</th>
                <th scope="col" className="text-left p-4 font-medium text-muted-foreground">Position</th>
                <th scope="col" className="text-left p-4 font-medium text-muted-foreground">Salary</th>
                <th scope="col" className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th scope="col" className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(row => (
                <tr key={row.id} className="border-b hover:bg-muted/30 transition-colors" data-testid={`table-row-${row.id}`}>
                  {/* Reuse column order but change content semantics */}
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                            {row.firstName[0]}{row.lastName[0]}
                        </div>
                        {row.firstName} {row.lastName}
                    </div>
                  </td>
                  <td className="p-4">{row.email}</td> {/* Mapped to Department */}
                  <td className="p-4">{row.age}</td> {/* Mapped to Position */}
                  <td className="p-4">${row.salary.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.department === 'Active' ? 'bg-green-100 text-green-700' : 
                        row.department === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                        {row.department}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(row)} data-testid={`button-edit-${row.id}`}>
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(row.id)} data-testid={`button-delete-${row.id}`}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4" data-testid="section-pagination">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of {filteredData.length} employees
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              data-testid="button-pagination-prev"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              data-testid="button-pagination-next"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{currentEmployee?.firstName ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <input required name="firstName" defaultValue={currentEmployee?.firstName} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <input required name="lastName" defaultValue={currentEmployee?.lastName} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Department</label>
                        <input required name="email" defaultValue={currentEmployee?.email} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Position</label>
                        <input required name="age" defaultValue={currentEmployee?.age} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Salary</label>
                        <input required type="number" name="salary" defaultValue={currentEmployee?.salary} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select name="department" defaultValue={currentEmployee?.department || 'Active'} className="w-full px-3 py-2 border rounded-md">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="On Leave">On Leave</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save Record</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
