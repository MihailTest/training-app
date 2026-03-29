# Media Validation - Manual Test Cases

## Happy Path - Accept supported media extension

Preconditions:

- App is running at `BASE_URL`.
- User can access `/form-controls/media-validation`.
- A `.png` file is available locally.

Steps:

1. Open `/form-controls/media-validation`.
2. Verify validation rules panel is visible.
3. Click `Select Media File` and choose a `.png` file.
4. Wait for `Validation Report` to update.
5. Review uploaded item status.
6. Verify report marks file as valid/ready.

Expected result:

- Uploaded `.png` appears in validation report.
- Status is `Valid` and ready for portfolio usage.

## Negative Path - Reject unsupported file format

Preconditions:

- A `.txt` file is available locally.

Steps:

1. Open media validation page.
2. Upload `.txt` file via `Select Media File`.
3. Wait for report refresh.
4. Review status and message for uploaded item.

Expected result:

- Uploaded `.txt` appears with `Invalid` status.
- Error reason indicates unsupported/invalid format.
