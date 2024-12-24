# Next Steps for TalentTrack Platform

## Form Validation System Improvements

### Phase 2 Priority: Core Features (2-3 weeks)
1. Basic Validation Enhancements
   - [ ] Add support for file validation in resume uploads
   - [ ] Implement basic field validation for job postings
   - [ ] Add application form validation with draft support

2. Type System Improvements
   - [ ] Add support for union types in validation rules
   - [ ] Implement better type inference for nested arrays
   - [ ] Add generic constraints for custom validation functions

### Phase 3 Priority: Enhanced Features (3-4 weeks)
1. Advanced Validation Features
   ```typescript
   interface EnhancedValidationRule<T, D = unknown> extends ValidationRule<T, D> {
     asyncValidate?: (value: T, data?: D) => Promise<string>;
     dependsOn?: string[];
     transform?: (value: T) => T;
     permissions?: string[];
   }
   ```

2. Form Component Updates
   - JobForm.tsx
     - Add dynamic field validation based on job type
     - Implement conditional validation for remote work
     - Add real-time validation for salary ranges

   - ApplicationForm.tsx
     - Add file validation for resume upload
     - Implement progressive form validation
     - Add draft application support

   - Common Components
     - Create reusable validation rule sets
     - Implement shared error message components
     - Add field-level help text support

### Phase 5 Priority: Performance & Integration (4-5 weeks)
1. Performance Optimizations
   - [ ] Implement memoization for complex validation rules
   - [ ] Add batch validation for array fields
   - [ ] Optimize form component re-renders

2. Real-time Integration
   ```typescript
   function useRealtimeValidation<T extends Record<string, unknown>>(
     rules: ValidationRules<T>,
     options: {
       onValidationChange?: (errors: ValidationErrors<T>) => void;
       realtimeFields?: Array<keyof T>;
     }
   ) {
     // Implementation
   }
   ```

3. Role-based Validation
   - Add support for role-specific validation rules
   - Implement field-level access control
   - Add validation for role-specific form fields

4. Custom Validation Types
   ```typescript
   type AsyncValidationRule<T, D = unknown> = {
     validate: (value: T, data?: D) => Promise<string>;
     debounce?: number;
     cacheResult?: boolean;
   };

   type ConditionalValidationRule<T, D = unknown> = {
     condition: (data: D) => boolean;
     validate: (value: T, data?: D) => string;
   };
   ```

## Database Integration & Validation

### Supabase Integration (2-3 weeks)
1. Job Form Validation
   ```typescript
   interface JobValidationRules extends ValidationRules<JobFormData> {
     title: {
       required: true;
       maxLength: 255; // Matches VARCHAR(255)
     };
     salary: {
       validate: (value: JobSalary) => {
         if (value.min < 0 || value.max < 0) return "Salary cannot be negative";
         if (value.currency.length !== 3) return "Invalid currency code";
         return "";
       };
     };
     requirements: {
       validate: (value: string[]) => {
         // Validate array storage compatibility
         return "";
       };
     };
   }
   ```

2. Application Form Validation
   ```typescript
   interface ApplicationValidationRules extends ValidationRules<ApplicationData> {
     resume_url: {
       required: true;
       validate: async (value: string) => {
         // Validate file upload to Supabase storage
         const isValid = await validateFileUpload(value);
         return isValid ? "" : "Invalid file upload";
       };
     };
     cover_letter: {
       required: true;
       validate: (value: string) => {
         // Validate TEXT field compatibility
         return "";
       };
     };
   }
   ```

3. Profile Validation
   ```typescript
   interface ProfileValidationRules extends ValidationRules<ProfileData> {
     first_name: {
       required: true;
       maxLength: 100; // Matches VARCHAR(100)
     };
     last_name: {
       required: true;
       maxLength: 100;
     };
     phone: {
       maxLength: 50;
       validate: (value?: string) => {
         if (!value) return "";
         // Phone format validation
         return "";
       };
     };
   }
   ```

### Supabase Storage Integration
1. File Upload Validation
   ```typescript
   async function validateFileUpload(file: File): Promise<string> {
     // Check file size
     const MAX_SIZE = 10 * 1024 * 1024; // 10MB
     if (file.size > MAX_SIZE) return "File too large";

     // Check file type
     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
     if (!allowedTypes.includes(file.type)) return "Invalid file type";

     // Validate storage bucket access
     try {
       const { data, error } = await supabase.storage
         .from('resumes')
         .upload(`temp/${file.name}`, file);
       
       if (error) throw error;
       return "";
     } catch (error) {
       return "File upload failed";
     }
   }
   ```

2. Storage Configuration
   ```sql
   -- Supabase storage policies
   CREATE POLICY "Allow users to upload resumes"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'resumes' AND
     auth.role() IN ('authenticated')
   );
   ```

### Database Constraints Integration
1. Field Length Validation
   ```typescript
   function createLengthValidator(field: string, maxLength: number) {
     return (value: string) => {
       if (value.length > maxLength) {
         return `${field} must be less than ${maxLength} characters`;
       }
       return "";
     };
   }
   ```

2. Enum Validation
   ```typescript
   const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'] as const;
   const EXPERIENCE_LEVELS = ['entry', 'mid', 'senior', 'lead'] as const;

   function createEnumValidator<T extends string>(field: string, allowedValues: readonly T[]) {
     return (value: string) => {
       if (!allowedValues.includes(value as T)) {
         return `Invalid ${field}. Must be one of: ${allowedValues.join(', ')}`;
       }
       return "";
     };
   }
   ```

### Performance Considerations
1. Batch Validation
   ```typescript
   async function validateBatch<T extends Record<string, unknown>>(
     records: T[],
     rules: ValidationRules<T>,
   ): Promise<ValidationErrors<T>[]> {
     // Implementation for batch validation
   }
   ```

2. Caching Strategy
   ```typescript
   interface ValidationCache<T> {
     value: T;
     result: string | null;
     timestamp: number;
   }

   function createCachedValidator<T>(
     validator: (value: T) => string | Promise<string>,
     ttl: number = 5000,
   ) {
     const cache = new Map<string, ValidationCache<T>>();
     // Implementation
   }
   ```

## Testing Strategy

### Unit Tests (Ongoing)
- [ ] Test validation rules for each form type
- [ ] Test async validation functionality
- [ ] Test role-based validation logic

### Integration Tests (Phase 3)
- [ ] Test form submission flows
- [ ] Test file upload validation
- [ ] Test real-time validation

### Performance Tests (Phase 5)
- [ ] Benchmark validation performance
- [ ] Test large form handling
- [ ] Measure re-render optimization

## Documentation Requirements

### Phase 2: Basic Documentation
- [ ] Document validation rule types
- [ ] Add basic usage examples
- [ ] Document form component props

### Phase 3: Enhanced Documentation
- [ ] Add complex validation examples
- [ ] Document file validation
- [ ] Add performance guidelines

### Phase 5: Complete Documentation
- [ ] Document real-time validation
- [ ] Add role-based validation guide
- [ ] Include performance optimization guide

## Dependencies
- TypeScript 5.0+
- React 18+
- WebSocket support for real-time features
- Updated testing framework

## Integration Points
1. Authentication System
   - Role-based validation rules
   - Permission checks

2. File Management
   - Resume upload validation
   - File type checking
   - Size limit validation

3. Real-time Features
   - WebSocket integration
   - Live validation updates
   - Draft saving

## Notes
- All changes must maintain backward compatibility
- Performance monitoring required throughout implementation
- Security considerations for role-based validation
- Align with existing UI/UX patterns
