# File Operations - Manual Test Cases

## Happy Path - Upload document and list it in My Documents

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/file-operations`.
- A local file is available.

Steps:

1. Open `/form-controls/file-operations`.
2. Confirm initial state of `My Documents` panel.
3. Upload a file using the file input.
4. Wait for list refresh.
5. Verify file appears with name and metadata.
6. Upload a second file and verify both entries are listed.

Expected result:

- Uploaded files are appended to document list.
- File names and metadata are displayed correctly.

## Negative Path - Empty-state before uploads

Preconditions:

- No files uploaded in current session.

Steps:

1. Open `/form-controls/file-operations`.
2. Observe `My Documents` panel without uploading anything.
3. Confirm placeholder/empty-state text is shown.

Expected result:

- Empty-state (`No documents uploaded`) is visible.
- No file rows are rendered before first upload.
