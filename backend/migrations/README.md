# Database Migrations

## Migration Files

### add_salary_department.sql (Development - Already Applied)
This migration adds `salary` and `department` columns to the jobs table.
- **Status**: Applied to development database
- **Note**: Not idempotent - will fail if run twice

### add_salary_department_safe.sql (Production Ready)
This is the production-safe version of the salary/department migration.
- **Features**:
  - Idempotent: Can be run multiple times safely
  - Checks if columns exist before adding them
  - Only updates NULL values, preserving existing data
  - Uses prepared statements for conditional execution

## For Production Deployment

When deploying to production, use `add_salary_department_safe.sql` instead of the original migration.

**Recommended steps:**
1. Backup the production database before running any migration
2. Test the migration on a staging environment first
3. Run the safe migration: `add_salary_department_safe.sql`
4. Verify the columns were added correctly
5. Check that existing job records were not modified unintentionally
