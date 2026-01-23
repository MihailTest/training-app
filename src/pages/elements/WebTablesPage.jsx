
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { generateMockData } from '@/utils/validators';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function WebTablesPage() {
  const [data, setData] = useState(generateMockData(10));
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const rowsPerPage = 5;

  const filteredData = data.filter(row =>
    row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDelete = (id) => {
    setData(prev => prev.filter(row => row.id !== id));
    toast({ title: 'Row deleted successfully' });
  };

  return (
    <>
      <Helmet>
        <title>Web Tables - UI Practice Hub</title>
        <meta name="description" content="Practice table operations with CRUD functionality" />
      </Helmet>

      <PageHeader title="Web Tables" subtitle="Practice table search, pagination, and CRUD operations" />

      <div className="bg-card border rounded-lg p-6 shadow-sm" data-testid="section-table-container">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
              data-testid="input-search-table"
            />
          </div>
          <Button className="gap-2" data-testid="button-add-record">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" data-testid="table-web-tables">
            <thead>
              <tr className="border-b">
                <th scope="col" className="text-left p-3">First Name</th>
                <th scope="col" className="text-left p-3">Last Name</th>
                <th scope="col" className="text-left p-3">Email</th>
                <th scope="col" className="text-left p-3">Age</th>
                <th scope="col" className="text-left p-3">Salary</th>
                <th scope="col" className="text-left p-3">Department</th>
                <th scope="col" className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(row => (
                <tr key={row.id} className="border-b hover:bg-muted/50" data-testid={`table-row-${row.id}`}>
                  <td className="p-3">{row.firstName}</td>
                  <td className="p-3">{row.lastName}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3">{row.age}</td>
                  <td className="p-3">${row.salary.toLocaleString()}</td>
                  <td className="p-3">{row.department}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" data-testid={`button-edit-${row.id}`}><Edit className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(row.id)} data-testid={`button-delete-${row.id}`}>
                        <Trash2 className="h-4 w-4" />
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
            Showing {paginatedData.length} of {filteredData.length} entries
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
    </>
  );
}
