drop trigger if exists "log_application_status_changes" on "public"."applications";

drop trigger if exists "update_applications_updated_at" on "public"."applications";

drop trigger if exists "update_jobs_updated_at" on "public"."jobs";

drop policy "Candidates can insert applications" on "public"."applications";

drop policy "Candidates can update their own applications" on "public"."applications";

drop policy "Candidates can view their own applications" on "public"."applications";

drop policy "Companies are viewable by everyone" on "public"."companies";

drop policy "Employers can insert companies" on "public"."companies";

drop policy "Employers can update their companies" on "public"."companies";

drop policy "Employers can insert jobs" on "public"."jobs";

drop policy "Employers can update their jobs" on "public"."jobs";

drop policy "Published jobs are viewable by everyone" on "public"."jobs";

drop policy "Public profiles are viewable by everyone" on "public"."profiles";

drop policy "Users can insert their own profile" on "public"."profiles";

drop policy "Users can update their own profile" on "public"."profiles";

revoke delete on table "public"."applications" from "anon";

revoke insert on table "public"."applications" from "anon";

revoke references on table "public"."applications" from "anon";

revoke select on table "public"."applications" from "anon";

revoke trigger on table "public"."applications" from "anon";

revoke truncate on table "public"."applications" from "anon";

revoke update on table "public"."applications" from "anon";

revoke delete on table "public"."applications" from "authenticated";

revoke insert on table "public"."applications" from "authenticated";

revoke references on table "public"."applications" from "authenticated";

revoke select on table "public"."applications" from "authenticated";

revoke trigger on table "public"."applications" from "authenticated";

revoke truncate on table "public"."applications" from "authenticated";

revoke update on table "public"."applications" from "authenticated";

revoke delete on table "public"."applications" from "service_role";

revoke insert on table "public"."applications" from "service_role";

revoke references on table "public"."applications" from "service_role";

revoke select on table "public"."applications" from "service_role";

revoke trigger on table "public"."applications" from "service_role";

revoke truncate on table "public"."applications" from "service_role";

revoke update on table "public"."applications" from "service_role";

revoke delete on table "public"."companies" from "anon";

revoke insert on table "public"."companies" from "anon";

revoke references on table "public"."companies" from "anon";

revoke select on table "public"."companies" from "anon";

revoke trigger on table "public"."companies" from "anon";

revoke truncate on table "public"."companies" from "anon";

revoke update on table "public"."companies" from "anon";

revoke delete on table "public"."companies" from "authenticated";

revoke insert on table "public"."companies" from "authenticated";

revoke references on table "public"."companies" from "authenticated";

revoke select on table "public"."companies" from "authenticated";

revoke trigger on table "public"."companies" from "authenticated";

revoke truncate on table "public"."companies" from "authenticated";

revoke update on table "public"."companies" from "authenticated";

revoke delete on table "public"."companies" from "service_role";

revoke insert on table "public"."companies" from "service_role";

revoke references on table "public"."companies" from "service_role";

revoke select on table "public"."companies" from "service_role";

revoke trigger on table "public"."companies" from "service_role";

revoke truncate on table "public"."companies" from "service_role";

revoke update on table "public"."companies" from "service_role";

revoke delete on table "public"."jobs" from "anon";

revoke insert on table "public"."jobs" from "anon";

revoke references on table "public"."jobs" from "anon";

revoke select on table "public"."jobs" from "anon";

revoke trigger on table "public"."jobs" from "anon";

revoke truncate on table "public"."jobs" from "anon";

revoke update on table "public"."jobs" from "anon";

revoke delete on table "public"."jobs" from "authenticated";

revoke insert on table "public"."jobs" from "authenticated";

revoke references on table "public"."jobs" from "authenticated";

revoke select on table "public"."jobs" from "authenticated";

revoke trigger on table "public"."jobs" from "authenticated";

revoke truncate on table "public"."jobs" from "authenticated";

revoke update on table "public"."jobs" from "authenticated";

revoke delete on table "public"."jobs" from "service_role";

revoke insert on table "public"."jobs" from "service_role";

revoke references on table "public"."jobs" from "service_role";

revoke select on table "public"."jobs" from "service_role";

revoke trigger on table "public"."jobs" from "service_role";

revoke truncate on table "public"."jobs" from "service_role";

revoke update on table "public"."jobs" from "service_role";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

alter table "public"."applications" drop constraint "applications_candidate_id_fkey";

alter table "public"."applications" drop constraint "applications_job_id_fkey";

alter table "public"."applications" drop constraint "applications_status_check";

alter table "public"."companies" drop constraint "companies_industry_check";

alter table "public"."companies" drop constraint "companies_size_range_check";

alter table "public"."jobs" drop constraint "jobs_company_id_fkey";

alter table "public"."jobs" drop constraint "jobs_experience_level_check";

alter table "public"."jobs" drop constraint "jobs_status_check";

alter table "public"."jobs" drop constraint "jobs_type_check";

alter table "public"."profiles" drop constraint "profiles_email_key";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."profiles" drop constraint "profiles_role_check";

alter table "public"."profiles" drop constraint "profiles_username_key";

drop function if exists "public"."add_application_timeline_event"(application_id uuid, event_type text, event_data jsonb);

drop function if exists "public"."log_application_status_change"();

drop function if exists "public"."update_updated_at_column"();

alter table "public"."applications" drop constraint "applications_pkey";

alter table "public"."companies" drop constraint "companies_pkey";

alter table "public"."jobs" drop constraint "jobs_pkey";

alter table "public"."profiles" drop constraint "profiles_pkey";

drop index if exists "public"."applications_answers_gin_idx";

drop index if exists "public"."applications_candidate_id_idx";

drop index if exists "public"."applications_job_id_idx";

drop index if exists "public"."applications_metadata_gin_idx";

drop index if exists "public"."applications_pkey";

drop index if exists "public"."applications_status_idx";

drop index if exists "public"."applications_timeline_gin_idx";

drop index if exists "public"."companies_industry_idx";

drop index if exists "public"."companies_location_idx";

drop index if exists "public"."companies_pkey";

drop index if exists "public"."companies_size_range_idx";

drop index if exists "public"."jobs_company_id_idx";

drop index if exists "public"."jobs_experience_level_idx";

drop index if exists "public"."jobs_location_idx";

drop index if exists "public"."jobs_metadata_gin_idx";

drop index if exists "public"."jobs_pkey";

drop index if exists "public"."jobs_salary_range_idx";

drop index if exists "public"."jobs_status_idx";

drop index if exists "public"."jobs_type_idx";

drop index if exists "public"."profiles_email_key";

drop index if exists "public"."profiles_pkey";

drop index if exists "public"."profiles_role_idx";

drop index if exists "public"."profiles_username_idx";

drop index if exists "public"."profiles_username_key";

drop table "public"."applications";

drop table "public"."companies";

drop table "public"."jobs";

drop table "public"."profiles";

create table "public"."account_balances" (
    "id" uuid not null default gen_random_uuid(),
    "account_id" uuid not null,
    "balance" numeric not null default 0,
    "last_updated_at" timestamp with time zone default now(),
    "tenant_id" uuid
);


alter table "public"."account_balances" enable row level security;

create table "public"."accounts" (
    "id" uuid not null default gen_random_uuid(),
    "code" text not null,
    "name" text not null,
    "type" text not null,
    "description" text,
    "parent_id" uuid,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."accounts" enable row level security;

create table "public"."analytics_dimensions" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid,
    "dimension_name" text not null,
    "dimension_values" jsonb not null,
    "metadata" jsonb,
    "created_at" timestamp with time zone default now()
);


alter table "public"."analytics_dimensions" enable row level security;

create table "public"."analytics_metrics" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid,
    "metric_name" text not null,
    "value" numeric not null,
    "dimension_values" jsonb,
    "timestamp" timestamp with time zone default now(),
    "metadata" jsonb
);


alter table "public"."analytics_metrics" enable row level security;

create table "public"."analytics_reports" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid,
    "name" text not null,
    "description" text,
    "config" jsonb not null,
    "created_by" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."analytics_reports" enable row level security;

create table "public"."api_endpoints" (
    "id" uuid not null default gen_random_uuid(),
    "path" text not null,
    "method" text not null,
    "version" text not null,
    "description" text,
    "parameters" jsonb,
    "response_schema" jsonb,
    "rate_limit" integer,
    "cache_ttl" integer,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."api_endpoints" enable row level security;

create table "public"."api_keys" (
    "id" uuid not null default gen_random_uuid(),
    "key" text not null,
    "name" text not null,
    "scopes" text[] not null default '{}'::text[],
    "expires_at" timestamp with time zone,
    "last_used_at" timestamp with time zone,
    "created_by" uuid,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."api_keys" enable row level security;

create table "public"."api_logs" (
    "id" uuid not null default gen_random_uuid(),
    "endpoint_id" uuid,
    "method" text not null,
    "path" text not null,
    "status_code" integer not null,
    "request_headers" jsonb,
    "request_body" jsonb,
    "response_body" jsonb,
    "duration" integer,
    "ip_address" text,
    "user_agent" text,
    "api_key_id" uuid,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."api_logs" enable row level security;

create table "public"."api_versions" (
    "id" uuid not null default gen_random_uuid(),
    "version" text not null,
    "status" text not null,
    "deprecation_date" timestamp with time zone,
    "changes" jsonb,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."api_versions" enable row level security;

create table "public"."approval_matrices" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_type" text not null,
    "threshold_amount" numeric,
    "required_roles" text[] not null,
    "min_approvers" integer not null,
    "approval_order" integer,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."approval_matrices" enable row level security;

create table "public"."audit_logs" (
    "id" uuid not null default gen_random_uuid(),
    "entity_type" text not null,
    "entity_id" uuid not null,
    "action" text not null,
    "changes" jsonb,
    "metadata" jsonb,
    "performed_by" uuid,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."audit_logs" enable row level security;

create table "public"."bills_of_exchange" (
    "id" uuid not null default gen_random_uuid(),
    "invoice_id" uuid not null,
    "financial_institution_id" uuid,
    "amount" numeric not null,
    "currency" text not null default 'USD'::text,
    "maturity_date" timestamp with time zone not null,
    "status" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."bills_of_exchange" enable row level security;

create table "public"."compliance_audits" (
    "id" uuid not null default gen_random_uuid(),
    "requirement_id" uuid,
    "status" text not null,
    "findings" jsonb,
    "auditor_id" uuid,
    "audit_date" timestamp with time zone not null,
    "next_audit_date" timestamp with time zone,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."compliance_audits" enable row level security;

create table "public"."compliance_reports" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "period_start" timestamp with time zone not null,
    "period_end" timestamp with time zone not null,
    "data" jsonb not null,
    "generated_by" uuid,
    "status" text not null,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."compliance_reports" enable row level security;

create table "public"."compliance_requirements" (
    "id" uuid not null default gen_random_uuid(),
    "code" text not null,
    "name" text not null,
    "description" text,
    "category" text not null,
    "validation_rules" jsonb,
    "required_documents" text[],
    "frequency" text,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."compliance_requirements" enable row level security;

create table "public"."contract_alerts" (
    "id" uuid not null default gen_random_uuid(),
    "contract_id" uuid,
    "severity" text not null,
    "category" text not null,
    "message" text not null,
    "status" text not null default 'active'::text,
    "created_at" timestamp with time zone default now(),
    "resolved_at" timestamp with time zone,
    "tenant_id" uuid
);


alter table "public"."contract_alerts" enable row level security;

create table "public"."contract_events" (
    "id" uuid not null default gen_random_uuid(),
    "contract_id" uuid,
    "event_type" text not null,
    "data" jsonb,
    "transaction_hash" text,
    "block_number" bigint,
    "created_at" timestamp with time zone default now()
);


alter table "public"."contract_events" enable row level security;

create table "public"."contract_monitoring_metrics" (
    "id" uuid not null default gen_random_uuid(),
    "contract_id" uuid,
    "metric_type" text not null,
    "value" numeric not null,
    "timestamp" timestamp with time zone default now(),
    "metadata" jsonb,
    "tenant_id" uuid
);


alter table "public"."contract_monitoring_metrics" enable row level security;

create table "public"."contract_parameters" (
    "id" uuid not null default gen_random_uuid(),
    "contract_id" uuid,
    "key" text not null,
    "value" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."contract_parameters" enable row level security;

create table "public"."credit_limits" (
    "id" uuid not null default gen_random_uuid(),
    "entity_id" uuid not null,
    "entity_type" text not null,
    "limit_amount" numeric not null,
    "used_amount" numeric not null default 0,
    "currency" text not null default 'USD'::text,
    "status" text not null,
    "last_reviewed_at" timestamp with time zone,
    "next_review_date" timestamp with time zone,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."credit_limits" enable row level security;

create table "public"."fee_structures" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "percentage" numeric not null,
    "min_amount" numeric,
    "max_amount" numeric,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."fee_structures" enable row level security;

create table "public"."integration_endpoints" (
    "id" uuid not null default gen_random_uuid(),
    "integration_id" uuid,
    "name" text not null,
    "method" text not null,
    "url" text not null,
    "headers" jsonb,
    "parameters" jsonb,
    "retry_config" jsonb,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."integration_endpoints" enable row level security;

create table "public"."integration_logs" (
    "id" uuid not null default gen_random_uuid(),
    "integration_id" uuid,
    "endpoint_id" uuid,
    "status" text not null,
    "request" jsonb,
    "response" jsonb,
    "error_message" text,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."integration_logs" enable row level security;

create table "public"."integration_mappings" (
    "id" uuid not null default gen_random_uuid(),
    "integration_id" uuid,
    "source_field" text not null,
    "target_field" text not null,
    "transformation" text,
    "validation_rules" jsonb,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."integration_mappings" enable row level security;

create table "public"."integrations" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "type" text not null,
    "config" jsonb not null,
    "credentials" jsonb,
    "status" text not null,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."integrations" enable row level security;

create table "public"."invoices" (
    "id" uuid not null default gen_random_uuid(),
    "supplier_id" uuid not null,
    "buyer_id" uuid not null,
    "amount" numeric not null,
    "currency" text not null default 'USD'::text,
    "due_date" timestamp with time zone not null,
    "status" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."invoices" enable row level security;

create table "public"."ledger_entries" (
    "id" uuid not null default gen_random_uuid(),
    "transaction_date" timestamp with time zone not null default now(),
    "account_id" uuid not null,
    "debit_amount" numeric default 0,
    "credit_amount" numeric default 0,
    "reference_type" text not null,
    "reference_id" uuid not null,
    "description" text,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."ledger_entries" enable row level security;

create table "public"."monitoring_thresholds" (
    "id" uuid not null default gen_random_uuid(),
    "tenant_id" uuid,
    "metric_type" text not null,
    "min_threshold" numeric,
    "max_threshold" numeric,
    "warning_threshold" numeric,
    "critical_threshold" numeric,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."monitoring_thresholds" enable row level security;

create table "public"."notification_settings" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "preferences" jsonb not null,
    "digest_frequency" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."notification_settings" enable row level security;

create table "public"."notification_templates" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "title" text not null,
    "content" text not null,
    "variables" jsonb,
    "created_at" timestamp with time zone default now()
);


alter table "public"."notification_templates" enable row level security;

create table "public"."report_exports" (
    "id" uuid not null default gen_random_uuid(),
    "report_id" uuid not null,
    "format" text not null,
    "file_path" text not null,
    "size" integer,
    "downloaded_by" uuid,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."report_exports" enable row level security;

create table "public"."report_templates" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "type" text not null,
    "config" jsonb not null,
    "is_system" boolean default false,
    "tenant_id" uuid,
    "created_by" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."report_templates" enable row level security;

create table "public"."report_visualizations" (
    "id" uuid not null default gen_random_uuid(),
    "template_id" uuid,
    "type" text not null,
    "config" jsonb not null,
    "order_index" integer not null,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."report_visualizations" enable row level security;

create table "public"."scheduled_reports" (
    "id" uuid not null default gen_random_uuid(),
    "template_id" uuid,
    "frequency" text not null,
    "recipients" jsonb not null,
    "next_run" timestamp with time zone not null,
    "last_run" timestamp with time zone,
    "status" text not null default 'active'::text,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."scheduled_reports" enable row level security;

create table "public"."smart_contracts" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "status" text not null,
    "contract_address" text,
    "metadata" jsonb,
    "parameters" jsonb,
    "created_by" uuid,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."smart_contracts" enable row level security;

create table "public"."tenants" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "type" text not null,
    "role" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."tenants" enable row level security;

create table "public"."transaction_fees" (
    "id" uuid not null default gen_random_uuid(),
    "invoice_id" uuid,
    "platform_fee" numeric not null,
    "interest_fee" numeric not null,
    "total_fee" numeric not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."transaction_fees" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "email" text not null,
    "first_name" text,
    "last_name" text,
    "tenant_id" uuid,
    "avatar_url" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."users" enable row level security;

create table "public"."workflow_assignments" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_instance_id" uuid,
    "step_id" uuid,
    "assigned_to" uuid,
    "status" text not null,
    "due_date" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."workflow_assignments" enable row level security;

create table "public"."workflow_comments" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_instance_id" uuid,
    "step_key" text not null,
    "comment" text not null,
    "created_by" uuid,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."workflow_comments" enable row level security;

create table "public"."workflow_definitions" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "version" integer not null default 1,
    "config" jsonb not null,
    "is_active" boolean default true,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."workflow_definitions" enable row level security;

create table "public"."workflow_history" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_instance_id" uuid,
    "step_from" text,
    "step_to" text,
    "action" text not null,
    "actor_id" uuid,
    "metadata" jsonb,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."workflow_history" enable row level security;

create table "public"."workflow_instances" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_definition_id" uuid,
    "current_step" text not null,
    "status" text not null,
    "context" jsonb,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."workflow_instances" enable row level security;

create table "public"."workflow_metrics" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_instance_id" uuid,
    "metric_type" text not null,
    "value" numeric not null,
    "metadata" jsonb,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."workflow_metrics" enable row level security;

create table "public"."workflow_steps" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_definition_id" uuid,
    "step_key" text not null,
    "name" text not null,
    "description" text,
    "config" jsonb,
    "required_roles" text[] not null default '{}'::text[],
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."workflow_steps" enable row level security;

create table "public"."workflow_templates" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "config" jsonb not null,
    "category" text not null,
    "is_active" boolean default true,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."workflow_templates" enable row level security;

create table "public"."workflow_transitions" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_definition_id" uuid,
    "from_step" text not null,
    "to_step" text not null,
    "conditions" jsonb,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."workflow_transitions" enable row level security;

create table "public"."workflow_validations" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_definition_id" uuid,
    "step_key" text not null,
    "validation_type" text not null,
    "validation_config" jsonb not null,
    "error_message" text not null,
    "tenant_id" uuid,
    "created_at" timestamp with time zone default now()
);


alter table "public"."workflow_validations" enable row level security;

CREATE UNIQUE INDEX account_balances_account_id_tenant_id_key ON public.account_balances USING btree (account_id, tenant_id);

CREATE UNIQUE INDEX account_balances_pkey ON public.account_balances USING btree (id);

CREATE UNIQUE INDEX accounts_code_key ON public.accounts USING btree (code);

CREATE UNIQUE INDEX accounts_pkey ON public.accounts USING btree (id);

CREATE UNIQUE INDEX analytics_dimensions_pkey ON public.analytics_dimensions USING btree (id);

CREATE UNIQUE INDEX analytics_metrics_pkey ON public.analytics_metrics USING btree (id);

CREATE UNIQUE INDEX analytics_reports_pkey ON public.analytics_reports USING btree (id);

CREATE UNIQUE INDEX api_endpoints_pkey ON public.api_endpoints USING btree (id);

CREATE UNIQUE INDEX api_keys_key_key ON public.api_keys USING btree (key);

CREATE UNIQUE INDEX api_keys_pkey ON public.api_keys USING btree (id);

CREATE UNIQUE INDEX api_logs_pkey ON public.api_logs USING btree (id);

CREATE UNIQUE INDEX api_versions_pkey ON public.api_versions USING btree (id);

CREATE UNIQUE INDEX approval_matrices_pkey ON public.approval_matrices USING btree (id);

CREATE UNIQUE INDEX audit_logs_pkey ON public.audit_logs USING btree (id);

CREATE UNIQUE INDEX bills_of_exchange_pkey ON public.bills_of_exchange USING btree (id);

CREATE UNIQUE INDEX compliance_audits_pkey ON public.compliance_audits USING btree (id);

CREATE UNIQUE INDEX compliance_reports_pkey ON public.compliance_reports USING btree (id);

CREATE UNIQUE INDEX compliance_requirements_pkey ON public.compliance_requirements USING btree (id);

CREATE UNIQUE INDEX contract_alerts_pkey ON public.contract_alerts USING btree (id);

CREATE UNIQUE INDEX contract_events_pkey ON public.contract_events USING btree (id);

CREATE UNIQUE INDEX contract_monitoring_metrics_pkey ON public.contract_monitoring_metrics USING btree (id);

CREATE UNIQUE INDEX contract_parameters_contract_id_key_key ON public.contract_parameters USING btree (contract_id, key);

CREATE UNIQUE INDEX contract_parameters_pkey ON public.contract_parameters USING btree (id);

CREATE UNIQUE INDEX credit_limits_pkey ON public.credit_limits USING btree (id);

CREATE UNIQUE INDEX fee_structures_pkey ON public.fee_structures USING btree (id);

CREATE INDEX idx_account_balances_account ON public.account_balances USING btree (account_id);

CREATE INDEX idx_alerts_contract ON public.contract_alerts USING btree (contract_id);

CREATE INDEX idx_alerts_status ON public.contract_alerts USING btree (status);

CREATE INDEX idx_analytics_dimensions_tenant ON public.analytics_dimensions USING btree (tenant_id);

CREATE INDEX idx_analytics_metrics_tenant ON public.analytics_metrics USING btree (tenant_id);

CREATE INDEX idx_analytics_metrics_timestamp ON public.analytics_metrics USING btree ("timestamp");

CREATE INDEX idx_analytics_reports_tenant ON public.analytics_reports USING btree (tenant_id);

CREATE INDEX idx_api_endpoints_path ON public.api_endpoints USING btree (path);

CREATE INDEX idx_api_endpoints_version ON public.api_endpoints USING btree (version);

CREATE INDEX idx_api_keys_key ON public.api_keys USING btree (key);

CREATE INDEX idx_api_logs_created_at ON public.api_logs USING btree (created_at);

CREATE INDEX idx_api_logs_endpoint ON public.api_logs USING btree (endpoint_id);

CREATE INDEX idx_api_versions_status ON public.api_versions USING btree (status);

CREATE INDEX idx_approval_matrices_workflow ON public.approval_matrices USING btree (workflow_type);

CREATE INDEX idx_audit_logs_entity ON public.audit_logs USING btree (entity_type, entity_id);

CREATE INDEX idx_bills_financial_institution_id ON public.bills_of_exchange USING btree (financial_institution_id);

CREATE INDEX idx_bills_invoice_id ON public.bills_of_exchange USING btree (invoice_id);

CREATE INDEX idx_compliance_audits_requirement ON public.compliance_audits USING btree (requirement_id);

CREATE INDEX idx_compliance_reports_type ON public.compliance_reports USING btree (type);

CREATE INDEX idx_contract_events_contract ON public.contract_events USING btree (contract_id);

CREATE INDEX idx_contract_parameters_contract ON public.contract_parameters USING btree (contract_id);

CREATE INDEX idx_credit_limits_entity ON public.credit_limits USING btree (entity_type, entity_id);

CREATE INDEX idx_integration_endpoints_integration ON public.integration_endpoints USING btree (integration_id);

CREATE INDEX idx_integration_logs_created_at ON public.integration_logs USING btree (created_at);

CREATE INDEX idx_integration_logs_integration ON public.integration_logs USING btree (integration_id);

CREATE INDEX idx_integration_logs_status ON public.integration_logs USING btree (status);

CREATE INDEX idx_integration_mappings_integration ON public.integration_mappings USING btree (integration_id);

CREATE INDEX idx_integrations_tenant ON public.integrations USING btree (tenant_id);

CREATE INDEX idx_invoices_buyer_id ON public.invoices USING btree (buyer_id);

CREATE INDEX idx_invoices_supplier_id ON public.invoices USING btree (supplier_id);

CREATE INDEX idx_ledger_entries_account ON public.ledger_entries USING btree (account_id);

CREATE INDEX idx_ledger_entries_date ON public.ledger_entries USING btree (transaction_date);

CREATE INDEX idx_ledger_entries_reference ON public.ledger_entries USING btree (reference_type, reference_id);

CREATE INDEX idx_monitoring_metrics_contract ON public.contract_monitoring_metrics USING btree (contract_id);

CREATE INDEX idx_monitoring_metrics_timestamp ON public.contract_monitoring_metrics USING btree ("timestamp");

CREATE INDEX idx_notification_settings_user_id ON public.notification_settings USING btree (user_id);

CREATE INDEX idx_report_exports_report ON public.report_exports USING btree (report_id);

CREATE INDEX idx_report_templates_type ON public.report_templates USING btree (type);

CREATE INDEX idx_report_visualizations_template ON public.report_visualizations USING btree (template_id);

CREATE INDEX idx_scheduled_reports_next_run ON public.scheduled_reports USING btree (next_run);

CREATE INDEX idx_smart_contracts_type ON public.smart_contracts USING btree (type);

CREATE INDEX idx_thresholds_tenant ON public.monitoring_thresholds USING btree (tenant_id);

CREATE INDEX idx_transaction_fees_invoice_id ON public.transaction_fees USING btree (invoice_id);

CREATE INDEX idx_workflow_assignments_instance ON public.workflow_assignments USING btree (workflow_instance_id);

CREATE INDEX idx_workflow_comments_instance ON public.workflow_comments USING btree (workflow_instance_id);

CREATE INDEX idx_workflow_history_instance ON public.workflow_history USING btree (workflow_instance_id);

CREATE INDEX idx_workflow_instances_definition ON public.workflow_instances USING btree (workflow_definition_id);

CREATE INDEX idx_workflow_instances_status ON public.workflow_instances USING btree (status);

CREATE INDEX idx_workflow_metrics_instance ON public.workflow_metrics USING btree (workflow_instance_id);

CREATE INDEX idx_workflow_templates_category ON public.workflow_templates USING btree (category);

CREATE INDEX idx_workflow_validations_definition ON public.workflow_validations USING btree (workflow_definition_id);

CREATE UNIQUE INDEX integration_endpoints_pkey ON public.integration_endpoints USING btree (id);

CREATE UNIQUE INDEX integration_logs_pkey ON public.integration_logs USING btree (id);

CREATE UNIQUE INDEX integration_mappings_pkey ON public.integration_mappings USING btree (id);

CREATE UNIQUE INDEX integrations_pkey ON public.integrations USING btree (id);

CREATE UNIQUE INDEX invoices_pkey ON public.invoices USING btree (id);

CREATE UNIQUE INDEX ledger_entries_pkey ON public.ledger_entries USING btree (id);

CREATE UNIQUE INDEX monitoring_thresholds_pkey ON public.monitoring_thresholds USING btree (id);

CREATE UNIQUE INDEX notification_settings_pkey ON public.notification_settings USING btree (id);

CREATE UNIQUE INDEX notification_templates_pkey ON public.notification_templates USING btree (id);

CREATE UNIQUE INDEX report_exports_pkey ON public.report_exports USING btree (id);

CREATE UNIQUE INDEX report_templates_pkey ON public.report_templates USING btree (id);

CREATE UNIQUE INDEX report_visualizations_pkey ON public.report_visualizations USING btree (id);

CREATE UNIQUE INDEX scheduled_reports_pkey ON public.scheduled_reports USING btree (id);

CREATE UNIQUE INDEX smart_contracts_contract_address_key ON public.smart_contracts USING btree (contract_address);

CREATE UNIQUE INDEX smart_contracts_pkey ON public.smart_contracts USING btree (id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

CREATE UNIQUE INDEX transaction_fees_pkey ON public.transaction_fees USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX workflow_assignments_pkey ON public.workflow_assignments USING btree (id);

CREATE UNIQUE INDEX workflow_comments_pkey ON public.workflow_comments USING btree (id);

CREATE UNIQUE INDEX workflow_definitions_pkey ON public.workflow_definitions USING btree (id);

CREATE UNIQUE INDEX workflow_history_pkey ON public.workflow_history USING btree (id);

CREATE UNIQUE INDEX workflow_instances_pkey ON public.workflow_instances USING btree (id);

CREATE UNIQUE INDEX workflow_metrics_pkey ON public.workflow_metrics USING btree (id);

CREATE UNIQUE INDEX workflow_steps_pkey ON public.workflow_steps USING btree (id);

CREATE UNIQUE INDEX workflow_templates_pkey ON public.workflow_templates USING btree (id);

CREATE UNIQUE INDEX workflow_transitions_pkey ON public.workflow_transitions USING btree (id);

CREATE UNIQUE INDEX workflow_validations_pkey ON public.workflow_validations USING btree (id);

alter table "public"."account_balances" add constraint "account_balances_pkey" PRIMARY KEY using index "account_balances_pkey";

alter table "public"."accounts" add constraint "accounts_pkey" PRIMARY KEY using index "accounts_pkey";

alter table "public"."analytics_dimensions" add constraint "analytics_dimensions_pkey" PRIMARY KEY using index "analytics_dimensions_pkey";

alter table "public"."analytics_metrics" add constraint "analytics_metrics_pkey" PRIMARY KEY using index "analytics_metrics_pkey";

alter table "public"."analytics_reports" add constraint "analytics_reports_pkey" PRIMARY KEY using index "analytics_reports_pkey";

alter table "public"."api_endpoints" add constraint "api_endpoints_pkey" PRIMARY KEY using index "api_endpoints_pkey";

alter table "public"."api_keys" add constraint "api_keys_pkey" PRIMARY KEY using index "api_keys_pkey";

alter table "public"."api_logs" add constraint "api_logs_pkey" PRIMARY KEY using index "api_logs_pkey";

alter table "public"."api_versions" add constraint "api_versions_pkey" PRIMARY KEY using index "api_versions_pkey";

alter table "public"."approval_matrices" add constraint "approval_matrices_pkey" PRIMARY KEY using index "approval_matrices_pkey";

alter table "public"."audit_logs" add constraint "audit_logs_pkey" PRIMARY KEY using index "audit_logs_pkey";

alter table "public"."bills_of_exchange" add constraint "bills_of_exchange_pkey" PRIMARY KEY using index "bills_of_exchange_pkey";

alter table "public"."compliance_audits" add constraint "compliance_audits_pkey" PRIMARY KEY using index "compliance_audits_pkey";

alter table "public"."compliance_reports" add constraint "compliance_reports_pkey" PRIMARY KEY using index "compliance_reports_pkey";

alter table "public"."compliance_requirements" add constraint "compliance_requirements_pkey" PRIMARY KEY using index "compliance_requirements_pkey";

alter table "public"."contract_alerts" add constraint "contract_alerts_pkey" PRIMARY KEY using index "contract_alerts_pkey";

alter table "public"."contract_events" add constraint "contract_events_pkey" PRIMARY KEY using index "contract_events_pkey";

alter table "public"."contract_monitoring_metrics" add constraint "contract_monitoring_metrics_pkey" PRIMARY KEY using index "contract_monitoring_metrics_pkey";

alter table "public"."contract_parameters" add constraint "contract_parameters_pkey" PRIMARY KEY using index "contract_parameters_pkey";

alter table "public"."credit_limits" add constraint "credit_limits_pkey" PRIMARY KEY using index "credit_limits_pkey";

alter table "public"."fee_structures" add constraint "fee_structures_pkey" PRIMARY KEY using index "fee_structures_pkey";

alter table "public"."integration_endpoints" add constraint "integration_endpoints_pkey" PRIMARY KEY using index "integration_endpoints_pkey";

alter table "public"."integration_logs" add constraint "integration_logs_pkey" PRIMARY KEY using index "integration_logs_pkey";

alter table "public"."integration_mappings" add constraint "integration_mappings_pkey" PRIMARY KEY using index "integration_mappings_pkey";

alter table "public"."integrations" add constraint "integrations_pkey" PRIMARY KEY using index "integrations_pkey";

alter table "public"."invoices" add constraint "invoices_pkey" PRIMARY KEY using index "invoices_pkey";

alter table "public"."ledger_entries" add constraint "ledger_entries_pkey" PRIMARY KEY using index "ledger_entries_pkey";

alter table "public"."monitoring_thresholds" add constraint "monitoring_thresholds_pkey" PRIMARY KEY using index "monitoring_thresholds_pkey";

alter table "public"."notification_settings" add constraint "notification_settings_pkey" PRIMARY KEY using index "notification_settings_pkey";

alter table "public"."notification_templates" add constraint "notification_templates_pkey" PRIMARY KEY using index "notification_templates_pkey";

alter table "public"."report_exports" add constraint "report_exports_pkey" PRIMARY KEY using index "report_exports_pkey";

alter table "public"."report_templates" add constraint "report_templates_pkey" PRIMARY KEY using index "report_templates_pkey";

alter table "public"."report_visualizations" add constraint "report_visualizations_pkey" PRIMARY KEY using index "report_visualizations_pkey";

alter table "public"."scheduled_reports" add constraint "scheduled_reports_pkey" PRIMARY KEY using index "scheduled_reports_pkey";

alter table "public"."smart_contracts" add constraint "smart_contracts_pkey" PRIMARY KEY using index "smart_contracts_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."transaction_fees" add constraint "transaction_fees_pkey" PRIMARY KEY using index "transaction_fees_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."workflow_assignments" add constraint "workflow_assignments_pkey" PRIMARY KEY using index "workflow_assignments_pkey";

alter table "public"."workflow_comments" add constraint "workflow_comments_pkey" PRIMARY KEY using index "workflow_comments_pkey";

alter table "public"."workflow_definitions" add constraint "workflow_definitions_pkey" PRIMARY KEY using index "workflow_definitions_pkey";

alter table "public"."workflow_history" add constraint "workflow_history_pkey" PRIMARY KEY using index "workflow_history_pkey";

alter table "public"."workflow_instances" add constraint "workflow_instances_pkey" PRIMARY KEY using index "workflow_instances_pkey";

alter table "public"."workflow_metrics" add constraint "workflow_metrics_pkey" PRIMARY KEY using index "workflow_metrics_pkey";

alter table "public"."workflow_steps" add constraint "workflow_steps_pkey" PRIMARY KEY using index "workflow_steps_pkey";

alter table "public"."workflow_templates" add constraint "workflow_templates_pkey" PRIMARY KEY using index "workflow_templates_pkey";

alter table "public"."workflow_transitions" add constraint "workflow_transitions_pkey" PRIMARY KEY using index "workflow_transitions_pkey";

alter table "public"."workflow_validations" add constraint "workflow_validations_pkey" PRIMARY KEY using index "workflow_validations_pkey";

alter table "public"."account_balances" add constraint "account_balances_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) not valid;

alter table "public"."account_balances" validate constraint "account_balances_account_id_fkey";

alter table "public"."account_balances" add constraint "account_balances_account_id_tenant_id_key" UNIQUE using index "account_balances_account_id_tenant_id_key";

alter table "public"."account_balances" add constraint "account_balances_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."account_balances" validate constraint "account_balances_tenant_id_fkey";

alter table "public"."accounts" add constraint "accounts_code_key" UNIQUE using index "accounts_code_key";

alter table "public"."accounts" add constraint "accounts_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES accounts(id) not valid;

alter table "public"."accounts" validate constraint "accounts_parent_id_fkey";

alter table "public"."accounts" add constraint "accounts_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."accounts" validate constraint "accounts_tenant_id_fkey";

alter table "public"."accounts" add constraint "accounts_type_check" CHECK ((type = ANY (ARRAY['asset'::text, 'liability'::text, 'equity'::text, 'revenue'::text, 'expense'::text]))) not valid;

alter table "public"."accounts" validate constraint "accounts_type_check";

alter table "public"."analytics_dimensions" add constraint "analytics_dimensions_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."analytics_dimensions" validate constraint "analytics_dimensions_tenant_id_fkey";

alter table "public"."analytics_metrics" add constraint "analytics_metrics_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."analytics_metrics" validate constraint "analytics_metrics_tenant_id_fkey";

alter table "public"."analytics_reports" add constraint "analytics_reports_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."analytics_reports" validate constraint "analytics_reports_created_by_fkey";

alter table "public"."analytics_reports" add constraint "analytics_reports_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."analytics_reports" validate constraint "analytics_reports_tenant_id_fkey";

alter table "public"."api_endpoints" add constraint "api_endpoints_method_check" CHECK ((method = ANY (ARRAY['GET'::text, 'POST'::text, 'PUT'::text, 'DELETE'::text, 'PATCH'::text]))) not valid;

alter table "public"."api_endpoints" validate constraint "api_endpoints_method_check";

alter table "public"."api_endpoints" add constraint "api_endpoints_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."api_endpoints" validate constraint "api_endpoints_tenant_id_fkey";

alter table "public"."api_keys" add constraint "api_keys_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."api_keys" validate constraint "api_keys_created_by_fkey";

alter table "public"."api_keys" add constraint "api_keys_key_key" UNIQUE using index "api_keys_key_key";

alter table "public"."api_keys" add constraint "api_keys_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."api_keys" validate constraint "api_keys_tenant_id_fkey";

alter table "public"."api_logs" add constraint "api_logs_api_key_id_fkey" FOREIGN KEY (api_key_id) REFERENCES api_keys(id) not valid;

alter table "public"."api_logs" validate constraint "api_logs_api_key_id_fkey";

alter table "public"."api_logs" add constraint "api_logs_endpoint_id_fkey" FOREIGN KEY (endpoint_id) REFERENCES api_endpoints(id) not valid;

alter table "public"."api_logs" validate constraint "api_logs_endpoint_id_fkey";

alter table "public"."api_logs" add constraint "api_logs_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."api_logs" validate constraint "api_logs_tenant_id_fkey";

alter table "public"."api_versions" add constraint "api_versions_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'deprecated'::text]))) not valid;

alter table "public"."api_versions" validate constraint "api_versions_status_check";

alter table "public"."api_versions" add constraint "api_versions_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."api_versions" validate constraint "api_versions_tenant_id_fkey";

alter table "public"."approval_matrices" add constraint "approval_matrices_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."approval_matrices" validate constraint "approval_matrices_tenant_id_fkey";

alter table "public"."audit_logs" add constraint "audit_logs_performed_by_fkey" FOREIGN KEY (performed_by) REFERENCES auth.users(id) not valid;

alter table "public"."audit_logs" validate constraint "audit_logs_performed_by_fkey";

alter table "public"."audit_logs" add constraint "audit_logs_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."audit_logs" validate constraint "audit_logs_tenant_id_fkey";

alter table "public"."bills_of_exchange" add constraint "bills_of_exchange_amount_check" CHECK ((amount > (0)::numeric)) not valid;

alter table "public"."bills_of_exchange" validate constraint "bills_of_exchange_amount_check";

alter table "public"."bills_of_exchange" add constraint "bills_of_exchange_financial_institution_id_fkey" FOREIGN KEY (financial_institution_id) REFERENCES users(id) not valid;

alter table "public"."bills_of_exchange" validate constraint "bills_of_exchange_financial_institution_id_fkey";

alter table "public"."bills_of_exchange" add constraint "bills_of_exchange_invoice_id_fkey" FOREIGN KEY (invoice_id) REFERENCES invoices(id) not valid;

alter table "public"."bills_of_exchange" validate constraint "bills_of_exchange_invoice_id_fkey";

alter table "public"."bills_of_exchange" add constraint "bills_of_exchange_status_check" CHECK ((status = ANY (ARRAY['issued'::text, 'endorsed'::text, 'funded'::text, 'paid'::text]))) not valid;

alter table "public"."bills_of_exchange" validate constraint "bills_of_exchange_status_check";

alter table "public"."compliance_audits" add constraint "compliance_audits_auditor_id_fkey" FOREIGN KEY (auditor_id) REFERENCES auth.users(id) not valid;

alter table "public"."compliance_audits" validate constraint "compliance_audits_auditor_id_fkey";

alter table "public"."compliance_audits" add constraint "compliance_audits_requirement_id_fkey" FOREIGN KEY (requirement_id) REFERENCES compliance_requirements(id) not valid;

alter table "public"."compliance_audits" validate constraint "compliance_audits_requirement_id_fkey";

alter table "public"."compliance_audits" add constraint "compliance_audits_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'in_progress'::text, 'completed'::text, 'failed'::text]))) not valid;

alter table "public"."compliance_audits" validate constraint "compliance_audits_status_check";

alter table "public"."compliance_audits" add constraint "compliance_audits_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."compliance_audits" validate constraint "compliance_audits_tenant_id_fkey";

alter table "public"."compliance_reports" add constraint "compliance_reports_generated_by_fkey" FOREIGN KEY (generated_by) REFERENCES auth.users(id) not valid;

alter table "public"."compliance_reports" validate constraint "compliance_reports_generated_by_fkey";

alter table "public"."compliance_reports" add constraint "compliance_reports_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text]))) not valid;

alter table "public"."compliance_reports" validate constraint "compliance_reports_status_check";

alter table "public"."compliance_reports" add constraint "compliance_reports_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."compliance_reports" validate constraint "compliance_reports_tenant_id_fkey";

alter table "public"."compliance_requirements" add constraint "compliance_requirements_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."compliance_requirements" validate constraint "compliance_requirements_tenant_id_fkey";

alter table "public"."contract_alerts" add constraint "contract_alerts_contract_id_fkey" FOREIGN KEY (contract_id) REFERENCES smart_contracts(id) not valid;

alter table "public"."contract_alerts" validate constraint "contract_alerts_contract_id_fkey";

alter table "public"."contract_alerts" add constraint "contract_alerts_severity_check" CHECK ((severity = ANY (ARRAY['info'::text, 'warning'::text, 'critical'::text]))) not valid;

alter table "public"."contract_alerts" validate constraint "contract_alerts_severity_check";

alter table "public"."contract_alerts" add constraint "contract_alerts_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."contract_alerts" validate constraint "contract_alerts_tenant_id_fkey";

alter table "public"."contract_events" add constraint "contract_events_contract_id_fkey" FOREIGN KEY (contract_id) REFERENCES smart_contracts(id) not valid;

alter table "public"."contract_events" validate constraint "contract_events_contract_id_fkey";

alter table "public"."contract_monitoring_metrics" add constraint "contract_monitoring_metrics_contract_id_fkey" FOREIGN KEY (contract_id) REFERENCES smart_contracts(id) not valid;

alter table "public"."contract_monitoring_metrics" validate constraint "contract_monitoring_metrics_contract_id_fkey";

alter table "public"."contract_monitoring_metrics" add constraint "contract_monitoring_metrics_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."contract_monitoring_metrics" validate constraint "contract_monitoring_metrics_tenant_id_fkey";

alter table "public"."contract_parameters" add constraint "contract_parameters_contract_id_fkey" FOREIGN KEY (contract_id) REFERENCES smart_contracts(id) not valid;

alter table "public"."contract_parameters" validate constraint "contract_parameters_contract_id_fkey";

alter table "public"."contract_parameters" add constraint "contract_parameters_contract_id_key_key" UNIQUE using index "contract_parameters_contract_id_key_key";

alter table "public"."credit_limits" add constraint "credit_limits_entity_type_check" CHECK ((entity_type = ANY (ARRAY['supplier'::text, 'buyer'::text]))) not valid;

alter table "public"."credit_limits" validate constraint "credit_limits_entity_type_check";

alter table "public"."credit_limits" add constraint "credit_limits_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'suspended'::text, 'exceeded'::text]))) not valid;

alter table "public"."credit_limits" validate constraint "credit_limits_status_check";

alter table "public"."credit_limits" add constraint "credit_limits_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."credit_limits" validate constraint "credit_limits_tenant_id_fkey";

alter table "public"."fee_structures" add constraint "fee_structures_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."fee_structures" validate constraint "fee_structures_tenant_id_fkey";

alter table "public"."fee_structures" add constraint "fee_structures_type_check" CHECK ((type = ANY (ARRAY['platform'::text, 'interest'::text]))) not valid;

alter table "public"."fee_structures" validate constraint "fee_structures_type_check";

alter table "public"."integration_endpoints" add constraint "integration_endpoints_integration_id_fkey" FOREIGN KEY (integration_id) REFERENCES integrations(id) not valid;

alter table "public"."integration_endpoints" validate constraint "integration_endpoints_integration_id_fkey";

alter table "public"."integration_endpoints" add constraint "integration_endpoints_method_check" CHECK ((method = ANY (ARRAY['GET'::text, 'POST'::text, 'PUT'::text, 'DELETE'::text]))) not valid;

alter table "public"."integration_endpoints" validate constraint "integration_endpoints_method_check";

alter table "public"."integration_endpoints" add constraint "integration_endpoints_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."integration_endpoints" validate constraint "integration_endpoints_tenant_id_fkey";

alter table "public"."integration_logs" add constraint "integration_logs_endpoint_id_fkey" FOREIGN KEY (endpoint_id) REFERENCES integration_endpoints(id) not valid;

alter table "public"."integration_logs" validate constraint "integration_logs_endpoint_id_fkey";

alter table "public"."integration_logs" add constraint "integration_logs_integration_id_fkey" FOREIGN KEY (integration_id) REFERENCES integrations(id) not valid;

alter table "public"."integration_logs" validate constraint "integration_logs_integration_id_fkey";

alter table "public"."integration_logs" add constraint "integration_logs_status_check" CHECK ((status = ANY (ARRAY['success'::text, 'error'::text, 'retry'::text]))) not valid;

alter table "public"."integration_logs" validate constraint "integration_logs_status_check";

alter table "public"."integration_logs" add constraint "integration_logs_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."integration_logs" validate constraint "integration_logs_tenant_id_fkey";

alter table "public"."integration_mappings" add constraint "integration_mappings_integration_id_fkey" FOREIGN KEY (integration_id) REFERENCES integrations(id) not valid;

alter table "public"."integration_mappings" validate constraint "integration_mappings_integration_id_fkey";

alter table "public"."integration_mappings" add constraint "integration_mappings_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."integration_mappings" validate constraint "integration_mappings_tenant_id_fkey";

alter table "public"."integrations" add constraint "integrations_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text, 'error'::text]))) not valid;

alter table "public"."integrations" validate constraint "integrations_status_check";

alter table "public"."integrations" add constraint "integrations_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."integrations" validate constraint "integrations_tenant_id_fkey";

alter table "public"."invoices" add constraint "invoices_amount_check" CHECK ((amount > (0)::numeric)) not valid;

alter table "public"."invoices" validate constraint "invoices_amount_check";

alter table "public"."invoices" add constraint "invoices_buyer_id_fkey" FOREIGN KEY (buyer_id) REFERENCES users(id) not valid;

alter table "public"."invoices" validate constraint "invoices_buyer_id_fkey";

alter table "public"."invoices" add constraint "invoices_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'financed'::text, 'paid'::text]))) not valid;

alter table "public"."invoices" validate constraint "invoices_status_check";

alter table "public"."invoices" add constraint "invoices_supplier_id_fkey" FOREIGN KEY (supplier_id) REFERENCES users(id) not valid;

alter table "public"."invoices" validate constraint "invoices_supplier_id_fkey";

alter table "public"."ledger_entries" add constraint "ledger_entries_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) not valid;

alter table "public"."ledger_entries" validate constraint "ledger_entries_account_id_fkey";

alter table "public"."ledger_entries" add constraint "ledger_entries_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."ledger_entries" validate constraint "ledger_entries_tenant_id_fkey";

alter table "public"."monitoring_thresholds" add constraint "monitoring_thresholds_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."monitoring_thresholds" validate constraint "monitoring_thresholds_tenant_id_fkey";

alter table "public"."notification_settings" add constraint "notification_settings_digest_frequency_check" CHECK ((digest_frequency = ANY (ARRAY['never'::text, 'daily'::text, 'weekly'::text]))) not valid;

alter table "public"."notification_settings" validate constraint "notification_settings_digest_frequency_check";

alter table "public"."notification_settings" add constraint "notification_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."notification_settings" validate constraint "notification_settings_user_id_fkey";

alter table "public"."report_exports" add constraint "report_exports_downloaded_by_fkey" FOREIGN KEY (downloaded_by) REFERENCES auth.users(id) not valid;

alter table "public"."report_exports" validate constraint "report_exports_downloaded_by_fkey";

alter table "public"."report_exports" add constraint "report_exports_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."report_exports" validate constraint "report_exports_tenant_id_fkey";

alter table "public"."report_templates" add constraint "report_templates_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."report_templates" validate constraint "report_templates_created_by_fkey";

alter table "public"."report_templates" add constraint "report_templates_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."report_templates" validate constraint "report_templates_tenant_id_fkey";

alter table "public"."report_visualizations" add constraint "report_visualizations_template_id_fkey" FOREIGN KEY (template_id) REFERENCES report_templates(id) not valid;

alter table "public"."report_visualizations" validate constraint "report_visualizations_template_id_fkey";

alter table "public"."report_visualizations" add constraint "report_visualizations_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."report_visualizations" validate constraint "report_visualizations_tenant_id_fkey";

alter table "public"."scheduled_reports" add constraint "scheduled_reports_template_id_fkey" FOREIGN KEY (template_id) REFERENCES report_templates(id) not valid;

alter table "public"."scheduled_reports" validate constraint "scheduled_reports_template_id_fkey";

alter table "public"."scheduled_reports" add constraint "scheduled_reports_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."scheduled_reports" validate constraint "scheduled_reports_tenant_id_fkey";

alter table "public"."smart_contracts" add constraint "smart_contracts_contract_address_key" UNIQUE using index "smart_contracts_contract_address_key";

alter table "public"."smart_contracts" add constraint "smart_contracts_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."smart_contracts" validate constraint "smart_contracts_created_by_fkey";

alter table "public"."smart_contracts" add constraint "smart_contracts_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'completed'::text, 'terminated'::text]))) not valid;

alter table "public"."smart_contracts" validate constraint "smart_contracts_status_check";

alter table "public"."smart_contracts" add constraint "smart_contracts_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."smart_contracts" validate constraint "smart_contracts_tenant_id_fkey";

alter table "public"."smart_contracts" add constraint "smart_contracts_type_check" CHECK ((type = ANY (ARRAY['bill_of_exchange'::text, 'payment_terms'::text, 'early_payment'::text]))) not valid;

alter table "public"."smart_contracts" validate constraint "smart_contracts_type_check";

alter table "public"."tenants" add constraint "tenants_role_check" CHECK ((role = ANY (ARRAY['platform_owner'::text, 'partner'::text, 'issuer'::text]))) not valid;

alter table "public"."tenants" validate constraint "tenants_role_check";

alter table "public"."tenants" add constraint "tenants_type_check" CHECK ((type = ANY (ARRAY['organization'::text, 'individual'::text]))) not valid;

alter table "public"."tenants" validate constraint "tenants_type_check";

alter table "public"."transaction_fees" add constraint "transaction_fees_invoice_id_fkey" FOREIGN KEY (invoice_id) REFERENCES invoices(id) not valid;

alter table "public"."transaction_fees" validate constraint "transaction_fees_invoice_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."users" validate constraint "users_tenant_id_fkey";

alter table "public"."workflow_assignments" add constraint "workflow_assignments_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES auth.users(id) not valid;

alter table "public"."workflow_assignments" validate constraint "workflow_assignments_assigned_to_fkey";

alter table "public"."workflow_assignments" add constraint "workflow_assignments_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'completed'::text, 'rejected'::text]))) not valid;

alter table "public"."workflow_assignments" validate constraint "workflow_assignments_status_check";

alter table "public"."workflow_assignments" add constraint "workflow_assignments_step_id_fkey" FOREIGN KEY (step_id) REFERENCES workflow_steps(id) not valid;

alter table "public"."workflow_assignments" validate constraint "workflow_assignments_step_id_fkey";

alter table "public"."workflow_assignments" add constraint "workflow_assignments_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_assignments" validate constraint "workflow_assignments_tenant_id_fkey";

alter table "public"."workflow_assignments" add constraint "workflow_assignments_workflow_instance_id_fkey" FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id) not valid;

alter table "public"."workflow_assignments" validate constraint "workflow_assignments_workflow_instance_id_fkey";

alter table "public"."workflow_comments" add constraint "workflow_comments_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."workflow_comments" validate constraint "workflow_comments_created_by_fkey";

alter table "public"."workflow_comments" add constraint "workflow_comments_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_comments" validate constraint "workflow_comments_tenant_id_fkey";

alter table "public"."workflow_comments" add constraint "workflow_comments_workflow_instance_id_fkey" FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id) not valid;

alter table "public"."workflow_comments" validate constraint "workflow_comments_workflow_instance_id_fkey";

alter table "public"."workflow_definitions" add constraint "workflow_definitions_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_definitions" validate constraint "workflow_definitions_tenant_id_fkey";

alter table "public"."workflow_history" add constraint "workflow_history_actor_id_fkey" FOREIGN KEY (actor_id) REFERENCES auth.users(id) not valid;

alter table "public"."workflow_history" validate constraint "workflow_history_actor_id_fkey";

alter table "public"."workflow_history" add constraint "workflow_history_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_history" validate constraint "workflow_history_tenant_id_fkey";

alter table "public"."workflow_history" add constraint "workflow_history_workflow_instance_id_fkey" FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id) not valid;

alter table "public"."workflow_history" validate constraint "workflow_history_workflow_instance_id_fkey";

alter table "public"."workflow_instances" add constraint "workflow_instances_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'completed'::text, 'suspended'::text, 'terminated'::text]))) not valid;

alter table "public"."workflow_instances" validate constraint "workflow_instances_status_check";

alter table "public"."workflow_instances" add constraint "workflow_instances_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_instances" validate constraint "workflow_instances_tenant_id_fkey";

alter table "public"."workflow_instances" add constraint "workflow_instances_workflow_definition_id_fkey" FOREIGN KEY (workflow_definition_id) REFERENCES workflow_definitions(id) not valid;

alter table "public"."workflow_instances" validate constraint "workflow_instances_workflow_definition_id_fkey";

alter table "public"."workflow_metrics" add constraint "workflow_metrics_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_metrics" validate constraint "workflow_metrics_tenant_id_fkey";

alter table "public"."workflow_metrics" add constraint "workflow_metrics_workflow_instance_id_fkey" FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id) not valid;

alter table "public"."workflow_metrics" validate constraint "workflow_metrics_workflow_instance_id_fkey";

alter table "public"."workflow_steps" add constraint "workflow_steps_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_steps" validate constraint "workflow_steps_tenant_id_fkey";

alter table "public"."workflow_steps" add constraint "workflow_steps_workflow_definition_id_fkey" FOREIGN KEY (workflow_definition_id) REFERENCES workflow_definitions(id) not valid;

alter table "public"."workflow_steps" validate constraint "workflow_steps_workflow_definition_id_fkey";

alter table "public"."workflow_templates" add constraint "workflow_templates_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_templates" validate constraint "workflow_templates_tenant_id_fkey";

alter table "public"."workflow_transitions" add constraint "workflow_transitions_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_transitions" validate constraint "workflow_transitions_tenant_id_fkey";

alter table "public"."workflow_transitions" add constraint "workflow_transitions_workflow_definition_id_fkey" FOREIGN KEY (workflow_definition_id) REFERENCES workflow_definitions(id) not valid;

alter table "public"."workflow_transitions" validate constraint "workflow_transitions_workflow_definition_id_fkey";

alter table "public"."workflow_validations" add constraint "workflow_validations_tenant_id_fkey" FOREIGN KEY (tenant_id) REFERENCES tenants(id) not valid;

alter table "public"."workflow_validations" validate constraint "workflow_validations_tenant_id_fkey";

alter table "public"."workflow_validations" add constraint "workflow_validations_workflow_definition_id_fkey" FOREIGN KEY (workflow_definition_id) REFERENCES workflow_definitions(id) not valid;

alter table "public"."workflow_validations" validate constraint "workflow_validations_workflow_definition_id_fkey";

set check_function_bodies = off;

create materialized view "public"."analytics_performance_metrics" as  SELECT analytics_metrics.tenant_id,
    analytics_metrics.metric_name,
    date_trunc('hour'::text, analytics_metrics."timestamp") AS time_bucket,
    avg(analytics_metrics.value) AS avg_value,
    min(analytics_metrics.value) AS min_value,
    max(analytics_metrics.value) AS max_value,
    count(*) AS sample_count
   FROM analytics_metrics
  GROUP BY analytics_metrics.tenant_id, analytics_metrics.metric_name, (date_trunc('hour'::text, analytics_metrics."timestamp"));


CREATE OR REPLACE FUNCTION public.check_credit_limit(p_entity_id uuid, p_entity_type text, p_amount numeric)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_limit decimal;
  v_used decimal;
BEGIN
  SELECT limit_amount, used_amount
  INTO v_limit, v_used
  FROM credit_limits
  WHERE entity_id = p_entity_id
    AND entity_type = p_entity_type
    AND status = 'active'
  LIMIT 1;

  RETURN (v_used + p_amount) <= v_limit;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_monitoring_thresholds()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Check if metric exceeds thresholds
  INSERT INTO contract_alerts (
    contract_id,
    severity,
    category,
    message,
    tenant_id
  )
  SELECT
    NEW.contract_id,
    CASE
      WHEN NEW.value > t.critical_threshold THEN 'critical'
      WHEN NEW.value > t.warning_threshold THEN 'warning'
      ELSE 'info'
    END,
    NEW.metric_type,
    'Metric ' || NEW.metric_type || ' exceeded threshold: ' || NEW.value,
    NEW.tenant_id
  FROM monitoring_thresholds t
  WHERE t.tenant_id = NEW.tenant_id
    AND t.metric_type = NEW.metric_type
    AND (
      NEW.value > t.warning_threshold
      OR NEW.value > t.critical_threshold
    );

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.collect_workflow_metrics()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Calculate and store step duration
  IF NEW.current_step != OLD.current_step THEN
    INSERT INTO workflow_metrics (
      workflow_instance_id,
      metric_type,
      value,
      metadata,
      tenant_id
    ) VALUES (
      NEW.id,
      'step_duration',
      EXTRACT(EPOCH FROM (NEW.updated_at - OLD.updated_at)),
      jsonb_build_object(
        'step', OLD.current_step,
        'next_step', NEW.current_step
      ),
      NEW.tenant_id
    );
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.log_workflow_history()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO workflow_history (
    workflow_instance_id,
    step_from,
    step_to,
    action,
    actor_id,
    metadata,
    tenant_id
  ) VALUES (
    NEW.id,
    OLD.current_step,
    NEW.current_step,
    CASE
      WHEN OLD.status != NEW.status THEN 'status_change'
      ELSE 'step_change'
    END,
    auth.uid(),
    jsonb_build_object(
      'old_status', OLD.status,
      'new_status', NEW.status,
      'context', NEW.context
    ),
    NEW.tenant_id
  );
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.refresh_analytics_performance_metrics()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY analytics_performance_metrics;
  RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.rotate_api_key(key_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  new_key text;
BEGIN
  -- Generate new API key
  new_key := encode(gen_random_bytes(32), 'hex');
  
  -- Update existing key
  UPDATE api_keys
  SET key = new_key,
      updated_at = now()
  WHERE id = key_id;
  
  RETURN new_key;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_account_balance()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO account_balances (account_id, balance, tenant_id)
  VALUES (NEW.account_id, NEW.debit_amount - NEW.credit_amount, NEW.tenant_id)
  ON CONFLICT (account_id, tenant_id)
  DO UPDATE SET
    balance = account_balances.balance + (NEW.debit_amount - NEW.credit_amount),
    last_updated_at = now();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO users (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."account_balances" to "anon";

grant insert on table "public"."account_balances" to "anon";

grant references on table "public"."account_balances" to "anon";

grant select on table "public"."account_balances" to "anon";

grant trigger on table "public"."account_balances" to "anon";

grant truncate on table "public"."account_balances" to "anon";

grant update on table "public"."account_balances" to "anon";

grant delete on table "public"."account_balances" to "authenticated";

grant insert on table "public"."account_balances" to "authenticated";

grant references on table "public"."account_balances" to "authenticated";

grant select on table "public"."account_balances" to "authenticated";

grant trigger on table "public"."account_balances" to "authenticated";

grant truncate on table "public"."account_balances" to "authenticated";

grant update on table "public"."account_balances" to "authenticated";

grant delete on table "public"."account_balances" to "service_role";

grant insert on table "public"."account_balances" to "service_role";

grant references on table "public"."account_balances" to "service_role";

grant select on table "public"."account_balances" to "service_role";

grant trigger on table "public"."account_balances" to "service_role";

grant truncate on table "public"."account_balances" to "service_role";

grant update on table "public"."account_balances" to "service_role";

grant delete on table "public"."accounts" to "anon";

grant insert on table "public"."accounts" to "anon";

grant references on table "public"."accounts" to "anon";

grant select on table "public"."accounts" to "anon";

grant trigger on table "public"."accounts" to "anon";

grant truncate on table "public"."accounts" to "anon";

grant update on table "public"."accounts" to "anon";

grant delete on table "public"."accounts" to "authenticated";

grant insert on table "public"."accounts" to "authenticated";

grant references on table "public"."accounts" to "authenticated";

grant select on table "public"."accounts" to "authenticated";

grant trigger on table "public"."accounts" to "authenticated";

grant truncate on table "public"."accounts" to "authenticated";

grant update on table "public"."accounts" to "authenticated";

grant delete on table "public"."accounts" to "service_role";

grant insert on table "public"."accounts" to "service_role";

grant references on table "public"."accounts" to "service_role";

grant select on table "public"."accounts" to "service_role";

grant trigger on table "public"."accounts" to "service_role";

grant truncate on table "public"."accounts" to "service_role";

grant update on table "public"."accounts" to "service_role";

grant delete on table "public"."analytics_dimensions" to "anon";

grant insert on table "public"."analytics_dimensions" to "anon";

grant references on table "public"."analytics_dimensions" to "anon";

grant select on table "public"."analytics_dimensions" to "anon";

grant trigger on table "public"."analytics_dimensions" to "anon";

grant truncate on table "public"."analytics_dimensions" to "anon";

grant update on table "public"."analytics_dimensions" to "anon";

grant delete on table "public"."analytics_dimensions" to "authenticated";

grant insert on table "public"."analytics_dimensions" to "authenticated";

grant references on table "public"."analytics_dimensions" to "authenticated";

grant select on table "public"."analytics_dimensions" to "authenticated";

grant trigger on table "public"."analytics_dimensions" to "authenticated";

grant truncate on table "public"."analytics_dimensions" to "authenticated";

grant update on table "public"."analytics_dimensions" to "authenticated";

grant delete on table "public"."analytics_dimensions" to "service_role";

grant insert on table "public"."analytics_dimensions" to "service_role";

grant references on table "public"."analytics_dimensions" to "service_role";

grant select on table "public"."analytics_dimensions" to "service_role";

grant trigger on table "public"."analytics_dimensions" to "service_role";

grant truncate on table "public"."analytics_dimensions" to "service_role";

grant update on table "public"."analytics_dimensions" to "service_role";

grant delete on table "public"."analytics_metrics" to "anon";

grant insert on table "public"."analytics_metrics" to "anon";

grant references on table "public"."analytics_metrics" to "anon";

grant select on table "public"."analytics_metrics" to "anon";

grant trigger on table "public"."analytics_metrics" to "anon";

grant truncate on table "public"."analytics_metrics" to "anon";

grant update on table "public"."analytics_metrics" to "anon";

grant delete on table "public"."analytics_metrics" to "authenticated";

grant insert on table "public"."analytics_metrics" to "authenticated";

grant references on table "public"."analytics_metrics" to "authenticated";

grant select on table "public"."analytics_metrics" to "authenticated";

grant trigger on table "public"."analytics_metrics" to "authenticated";

grant truncate on table "public"."analytics_metrics" to "authenticated";

grant update on table "public"."analytics_metrics" to "authenticated";

grant delete on table "public"."analytics_metrics" to "service_role";

grant insert on table "public"."analytics_metrics" to "service_role";

grant references on table "public"."analytics_metrics" to "service_role";

grant select on table "public"."analytics_metrics" to "service_role";

grant trigger on table "public"."analytics_metrics" to "service_role";

grant truncate on table "public"."analytics_metrics" to "service_role";

grant update on table "public"."analytics_metrics" to "service_role";

grant delete on table "public"."analytics_reports" to "anon";

grant insert on table "public"."analytics_reports" to "anon";

grant references on table "public"."analytics_reports" to "anon";

grant select on table "public"."analytics_reports" to "anon";

grant trigger on table "public"."analytics_reports" to "anon";

grant truncate on table "public"."analytics_reports" to "anon";

grant update on table "public"."analytics_reports" to "anon";

grant delete on table "public"."analytics_reports" to "authenticated";

grant insert on table "public"."analytics_reports" to "authenticated";

grant references on table "public"."analytics_reports" to "authenticated";

grant select on table "public"."analytics_reports" to "authenticated";

grant trigger on table "public"."analytics_reports" to "authenticated";

grant truncate on table "public"."analytics_reports" to "authenticated";

grant update on table "public"."analytics_reports" to "authenticated";

grant delete on table "public"."analytics_reports" to "service_role";

grant insert on table "public"."analytics_reports" to "service_role";

grant references on table "public"."analytics_reports" to "service_role";

grant select on table "public"."analytics_reports" to "service_role";

grant trigger on table "public"."analytics_reports" to "service_role";

grant truncate on table "public"."analytics_reports" to "service_role";

grant update on table "public"."analytics_reports" to "service_role";

grant delete on table "public"."api_endpoints" to "anon";

grant insert on table "public"."api_endpoints" to "anon";

grant references on table "public"."api_endpoints" to "anon";

grant select on table "public"."api_endpoints" to "anon";

grant trigger on table "public"."api_endpoints" to "anon";

grant truncate on table "public"."api_endpoints" to "anon";

grant update on table "public"."api_endpoints" to "anon";

grant delete on table "public"."api_endpoints" to "authenticated";

grant insert on table "public"."api_endpoints" to "authenticated";

grant references on table "public"."api_endpoints" to "authenticated";

grant select on table "public"."api_endpoints" to "authenticated";

grant trigger on table "public"."api_endpoints" to "authenticated";

grant truncate on table "public"."api_endpoints" to "authenticated";

grant update on table "public"."api_endpoints" to "authenticated";

grant delete on table "public"."api_endpoints" to "service_role";

grant insert on table "public"."api_endpoints" to "service_role";

grant references on table "public"."api_endpoints" to "service_role";

grant select on table "public"."api_endpoints" to "service_role";

grant trigger on table "public"."api_endpoints" to "service_role";

grant truncate on table "public"."api_endpoints" to "service_role";

grant update on table "public"."api_endpoints" to "service_role";

grant delete on table "public"."api_keys" to "anon";

grant insert on table "public"."api_keys" to "anon";

grant references on table "public"."api_keys" to "anon";

grant select on table "public"."api_keys" to "anon";

grant trigger on table "public"."api_keys" to "anon";

grant truncate on table "public"."api_keys" to "anon";

grant update on table "public"."api_keys" to "anon";

grant delete on table "public"."api_keys" to "authenticated";

grant insert on table "public"."api_keys" to "authenticated";

grant references on table "public"."api_keys" to "authenticated";

grant select on table "public"."api_keys" to "authenticated";

grant trigger on table "public"."api_keys" to "authenticated";

grant truncate on table "public"."api_keys" to "authenticated";

grant update on table "public"."api_keys" to "authenticated";

grant delete on table "public"."api_keys" to "service_role";

grant insert on table "public"."api_keys" to "service_role";

grant references on table "public"."api_keys" to "service_role";

grant select on table "public"."api_keys" to "service_role";

grant trigger on table "public"."api_keys" to "service_role";

grant truncate on table "public"."api_keys" to "service_role";

grant update on table "public"."api_keys" to "service_role";

grant delete on table "public"."api_logs" to "anon";

grant insert on table "public"."api_logs" to "anon";

grant references on table "public"."api_logs" to "anon";

grant select on table "public"."api_logs" to "anon";

grant trigger on table "public"."api_logs" to "anon";

grant truncate on table "public"."api_logs" to "anon";

grant update on table "public"."api_logs" to "anon";

grant delete on table "public"."api_logs" to "authenticated";

grant insert on table "public"."api_logs" to "authenticated";

grant references on table "public"."api_logs" to "authenticated";

grant select on table "public"."api_logs" to "authenticated";

grant trigger on table "public"."api_logs" to "authenticated";

grant truncate on table "public"."api_logs" to "authenticated";

grant update on table "public"."api_logs" to "authenticated";

grant delete on table "public"."api_logs" to "service_role";

grant insert on table "public"."api_logs" to "service_role";

grant references on table "public"."api_logs" to "service_role";

grant select on table "public"."api_logs" to "service_role";

grant trigger on table "public"."api_logs" to "service_role";

grant truncate on table "public"."api_logs" to "service_role";

grant update on table "public"."api_logs" to "service_role";

grant delete on table "public"."api_versions" to "anon";

grant insert on table "public"."api_versions" to "anon";

grant references on table "public"."api_versions" to "anon";

grant select on table "public"."api_versions" to "anon";

grant trigger on table "public"."api_versions" to "anon";

grant truncate on table "public"."api_versions" to "anon";

grant update on table "public"."api_versions" to "anon";

grant delete on table "public"."api_versions" to "authenticated";

grant insert on table "public"."api_versions" to "authenticated";

grant references on table "public"."api_versions" to "authenticated";

grant select on table "public"."api_versions" to "authenticated";

grant trigger on table "public"."api_versions" to "authenticated";

grant truncate on table "public"."api_versions" to "authenticated";

grant update on table "public"."api_versions" to "authenticated";

grant delete on table "public"."api_versions" to "service_role";

grant insert on table "public"."api_versions" to "service_role";

grant references on table "public"."api_versions" to "service_role";

grant select on table "public"."api_versions" to "service_role";

grant trigger on table "public"."api_versions" to "service_role";

grant truncate on table "public"."api_versions" to "service_role";

grant update on table "public"."api_versions" to "service_role";

grant delete on table "public"."approval_matrices" to "anon";

grant insert on table "public"."approval_matrices" to "anon";

grant references on table "public"."approval_matrices" to "anon";

grant select on table "public"."approval_matrices" to "anon";

grant trigger on table "public"."approval_matrices" to "anon";

grant truncate on table "public"."approval_matrices" to "anon";

grant update on table "public"."approval_matrices" to "anon";

grant delete on table "public"."approval_matrices" to "authenticated";

grant insert on table "public"."approval_matrices" to "authenticated";

grant references on table "public"."approval_matrices" to "authenticated";

grant select on table "public"."approval_matrices" to "authenticated";

grant trigger on table "public"."approval_matrices" to "authenticated";

grant truncate on table "public"."approval_matrices" to "authenticated";

grant update on table "public"."approval_matrices" to "authenticated";

grant delete on table "public"."approval_matrices" to "service_role";

grant insert on table "public"."approval_matrices" to "service_role";

grant references on table "public"."approval_matrices" to "service_role";

grant select on table "public"."approval_matrices" to "service_role";

grant trigger on table "public"."approval_matrices" to "service_role";

grant truncate on table "public"."approval_matrices" to "service_role";

grant update on table "public"."approval_matrices" to "service_role";

grant delete on table "public"."audit_logs" to "anon";

grant insert on table "public"."audit_logs" to "anon";

grant references on table "public"."audit_logs" to "anon";

grant select on table "public"."audit_logs" to "anon";

grant trigger on table "public"."audit_logs" to "anon";

grant truncate on table "public"."audit_logs" to "anon";

grant update on table "public"."audit_logs" to "anon";

grant delete on table "public"."audit_logs" to "authenticated";

grant insert on table "public"."audit_logs" to "authenticated";

grant references on table "public"."audit_logs" to "authenticated";

grant select on table "public"."audit_logs" to "authenticated";

grant trigger on table "public"."audit_logs" to "authenticated";

grant truncate on table "public"."audit_logs" to "authenticated";

grant update on table "public"."audit_logs" to "authenticated";

grant delete on table "public"."audit_logs" to "service_role";

grant insert on table "public"."audit_logs" to "service_role";

grant references on table "public"."audit_logs" to "service_role";

grant select on table "public"."audit_logs" to "service_role";

grant trigger on table "public"."audit_logs" to "service_role";

grant truncate on table "public"."audit_logs" to "service_role";

grant update on table "public"."audit_logs" to "service_role";

grant delete on table "public"."bills_of_exchange" to "anon";

grant insert on table "public"."bills_of_exchange" to "anon";

grant references on table "public"."bills_of_exchange" to "anon";

grant select on table "public"."bills_of_exchange" to "anon";

grant trigger on table "public"."bills_of_exchange" to "anon";

grant truncate on table "public"."bills_of_exchange" to "anon";

grant update on table "public"."bills_of_exchange" to "anon";

grant delete on table "public"."bills_of_exchange" to "authenticated";

grant insert on table "public"."bills_of_exchange" to "authenticated";

grant references on table "public"."bills_of_exchange" to "authenticated";

grant select on table "public"."bills_of_exchange" to "authenticated";

grant trigger on table "public"."bills_of_exchange" to "authenticated";

grant truncate on table "public"."bills_of_exchange" to "authenticated";

grant update on table "public"."bills_of_exchange" to "authenticated";

grant delete on table "public"."bills_of_exchange" to "service_role";

grant insert on table "public"."bills_of_exchange" to "service_role";

grant references on table "public"."bills_of_exchange" to "service_role";

grant select on table "public"."bills_of_exchange" to "service_role";

grant trigger on table "public"."bills_of_exchange" to "service_role";

grant truncate on table "public"."bills_of_exchange" to "service_role";

grant update on table "public"."bills_of_exchange" to "service_role";

grant delete on table "public"."compliance_audits" to "anon";

grant insert on table "public"."compliance_audits" to "anon";

grant references on table "public"."compliance_audits" to "anon";

grant select on table "public"."compliance_audits" to "anon";

grant trigger on table "public"."compliance_audits" to "anon";

grant truncate on table "public"."compliance_audits" to "anon";

grant update on table "public"."compliance_audits" to "anon";

grant delete on table "public"."compliance_audits" to "authenticated";

grant insert on table "public"."compliance_audits" to "authenticated";

grant references on table "public"."compliance_audits" to "authenticated";

grant select on table "public"."compliance_audits" to "authenticated";

grant trigger on table "public"."compliance_audits" to "authenticated";

grant truncate on table "public"."compliance_audits" to "authenticated";

grant update on table "public"."compliance_audits" to "authenticated";

grant delete on table "public"."compliance_audits" to "service_role";

grant insert on table "public"."compliance_audits" to "service_role";

grant references on table "public"."compliance_audits" to "service_role";

grant select on table "public"."compliance_audits" to "service_role";

grant trigger on table "public"."compliance_audits" to "service_role";

grant truncate on table "public"."compliance_audits" to "service_role";

grant update on table "public"."compliance_audits" to "service_role";

grant delete on table "public"."compliance_reports" to "anon";

grant insert on table "public"."compliance_reports" to "anon";

grant references on table "public"."compliance_reports" to "anon";

grant select on table "public"."compliance_reports" to "anon";

grant trigger on table "public"."compliance_reports" to "anon";

grant truncate on table "public"."compliance_reports" to "anon";

grant update on table "public"."compliance_reports" to "anon";

grant delete on table "public"."compliance_reports" to "authenticated";

grant insert on table "public"."compliance_reports" to "authenticated";

grant references on table "public"."compliance_reports" to "authenticated";

grant select on table "public"."compliance_reports" to "authenticated";

grant trigger on table "public"."compliance_reports" to "authenticated";

grant truncate on table "public"."compliance_reports" to "authenticated";

grant update on table "public"."compliance_reports" to "authenticated";

grant delete on table "public"."compliance_reports" to "service_role";

grant insert on table "public"."compliance_reports" to "service_role";

grant references on table "public"."compliance_reports" to "service_role";

grant select on table "public"."compliance_reports" to "service_role";

grant trigger on table "public"."compliance_reports" to "service_role";

grant truncate on table "public"."compliance_reports" to "service_role";

grant update on table "public"."compliance_reports" to "service_role";

grant delete on table "public"."compliance_requirements" to "anon";

grant insert on table "public"."compliance_requirements" to "anon";

grant references on table "public"."compliance_requirements" to "anon";

grant select on table "public"."compliance_requirements" to "anon";

grant trigger on table "public"."compliance_requirements" to "anon";

grant truncate on table "public"."compliance_requirements" to "anon";

grant update on table "public"."compliance_requirements" to "anon";

grant delete on table "public"."compliance_requirements" to "authenticated";

grant insert on table "public"."compliance_requirements" to "authenticated";

grant references on table "public"."compliance_requirements" to "authenticated";

grant select on table "public"."compliance_requirements" to "authenticated";

grant trigger on table "public"."compliance_requirements" to "authenticated";

grant truncate on table "public"."compliance_requirements" to "authenticated";

grant update on table "public"."compliance_requirements" to "authenticated";

grant delete on table "public"."compliance_requirements" to "service_role";

grant insert on table "public"."compliance_requirements" to "service_role";

grant references on table "public"."compliance_requirements" to "service_role";

grant select on table "public"."compliance_requirements" to "service_role";

grant trigger on table "public"."compliance_requirements" to "service_role";

grant truncate on table "public"."compliance_requirements" to "service_role";

grant update on table "public"."compliance_requirements" to "service_role";

grant delete on table "public"."contract_alerts" to "anon";

grant insert on table "public"."contract_alerts" to "anon";

grant references on table "public"."contract_alerts" to "anon";

grant select on table "public"."contract_alerts" to "anon";

grant trigger on table "public"."contract_alerts" to "anon";

grant truncate on table "public"."contract_alerts" to "anon";

grant update on table "public"."contract_alerts" to "anon";

grant delete on table "public"."contract_alerts" to "authenticated";

grant insert on table "public"."contract_alerts" to "authenticated";

grant references on table "public"."contract_alerts" to "authenticated";

grant select on table "public"."contract_alerts" to "authenticated";

grant trigger on table "public"."contract_alerts" to "authenticated";

grant truncate on table "public"."contract_alerts" to "authenticated";

grant update on table "public"."contract_alerts" to "authenticated";

grant delete on table "public"."contract_alerts" to "service_role";

grant insert on table "public"."contract_alerts" to "service_role";

grant references on table "public"."contract_alerts" to "service_role";

grant select on table "public"."contract_alerts" to "service_role";

grant trigger on table "public"."contract_alerts" to "service_role";

grant truncate on table "public"."contract_alerts" to "service_role";

grant update on table "public"."contract_alerts" to "service_role";

grant delete on table "public"."contract_events" to "anon";

grant insert on table "public"."contract_events" to "anon";

grant references on table "public"."contract_events" to "anon";

grant select on table "public"."contract_events" to "anon";

grant trigger on table "public"."contract_events" to "anon";

grant truncate on table "public"."contract_events" to "anon";

grant update on table "public"."contract_events" to "anon";

grant delete on table "public"."contract_events" to "authenticated";

grant insert on table "public"."contract_events" to "authenticated";

grant references on table "public"."contract_events" to "authenticated";

grant select on table "public"."contract_events" to "authenticated";

grant trigger on table "public"."contract_events" to "authenticated";

grant truncate on table "public"."contract_events" to "authenticated";

grant update on table "public"."contract_events" to "authenticated";

grant delete on table "public"."contract_events" to "service_role";

grant insert on table "public"."contract_events" to "service_role";

grant references on table "public"."contract_events" to "service_role";

grant select on table "public"."contract_events" to "service_role";

grant trigger on table "public"."contract_events" to "service_role";

grant truncate on table "public"."contract_events" to "service_role";

grant update on table "public"."contract_events" to "service_role";

grant delete on table "public"."contract_monitoring_metrics" to "anon";

grant insert on table "public"."contract_monitoring_metrics" to "anon";

grant references on table "public"."contract_monitoring_metrics" to "anon";

grant select on table "public"."contract_monitoring_metrics" to "anon";

grant trigger on table "public"."contract_monitoring_metrics" to "anon";

grant truncate on table "public"."contract_monitoring_metrics" to "anon";

grant update on table "public"."contract_monitoring_metrics" to "anon";

grant delete on table "public"."contract_monitoring_metrics" to "authenticated";

grant insert on table "public"."contract_monitoring_metrics" to "authenticated";

grant references on table "public"."contract_monitoring_metrics" to "authenticated";

grant select on table "public"."contract_monitoring_metrics" to "authenticated";

grant trigger on table "public"."contract_monitoring_metrics" to "authenticated";

grant truncate on table "public"."contract_monitoring_metrics" to "authenticated";

grant update on table "public"."contract_monitoring_metrics" to "authenticated";

grant delete on table "public"."contract_monitoring_metrics" to "service_role";

grant insert on table "public"."contract_monitoring_metrics" to "service_role";

grant references on table "public"."contract_monitoring_metrics" to "service_role";

grant select on table "public"."contract_monitoring_metrics" to "service_role";

grant trigger on table "public"."contract_monitoring_metrics" to "service_role";

grant truncate on table "public"."contract_monitoring_metrics" to "service_role";

grant update on table "public"."contract_monitoring_metrics" to "service_role";

grant delete on table "public"."contract_parameters" to "anon";

grant insert on table "public"."contract_parameters" to "anon";

grant references on table "public"."contract_parameters" to "anon";

grant select on table "public"."contract_parameters" to "anon";

grant trigger on table "public"."contract_parameters" to "anon";

grant truncate on table "public"."contract_parameters" to "anon";

grant update on table "public"."contract_parameters" to "anon";

grant delete on table "public"."contract_parameters" to "authenticated";

grant insert on table "public"."contract_parameters" to "authenticated";

grant references on table "public"."contract_parameters" to "authenticated";

grant select on table "public"."contract_parameters" to "authenticated";

grant trigger on table "public"."contract_parameters" to "authenticated";

grant truncate on table "public"."contract_parameters" to "authenticated";

grant update on table "public"."contract_parameters" to "authenticated";

grant delete on table "public"."contract_parameters" to "service_role";

grant insert on table "public"."contract_parameters" to "service_role";

grant references on table "public"."contract_parameters" to "service_role";

grant select on table "public"."contract_parameters" to "service_role";

grant trigger on table "public"."contract_parameters" to "service_role";

grant truncate on table "public"."contract_parameters" to "service_role";

grant update on table "public"."contract_parameters" to "service_role";

grant delete on table "public"."credit_limits" to "anon";

grant insert on table "public"."credit_limits" to "anon";

grant references on table "public"."credit_limits" to "anon";

grant select on table "public"."credit_limits" to "anon";

grant trigger on table "public"."credit_limits" to "anon";

grant truncate on table "public"."credit_limits" to "anon";

grant update on table "public"."credit_limits" to "anon";

grant delete on table "public"."credit_limits" to "authenticated";

grant insert on table "public"."credit_limits" to "authenticated";

grant references on table "public"."credit_limits" to "authenticated";

grant select on table "public"."credit_limits" to "authenticated";

grant trigger on table "public"."credit_limits" to "authenticated";

grant truncate on table "public"."credit_limits" to "authenticated";

grant update on table "public"."credit_limits" to "authenticated";

grant delete on table "public"."credit_limits" to "service_role";

grant insert on table "public"."credit_limits" to "service_role";

grant references on table "public"."credit_limits" to "service_role";

grant select on table "public"."credit_limits" to "service_role";

grant trigger on table "public"."credit_limits" to "service_role";

grant truncate on table "public"."credit_limits" to "service_role";

grant update on table "public"."credit_limits" to "service_role";

grant delete on table "public"."fee_structures" to "anon";

grant insert on table "public"."fee_structures" to "anon";

grant references on table "public"."fee_structures" to "anon";

grant select on table "public"."fee_structures" to "anon";

grant trigger on table "public"."fee_structures" to "anon";

grant truncate on table "public"."fee_structures" to "anon";

grant update on table "public"."fee_structures" to "anon";

grant delete on table "public"."fee_structures" to "authenticated";

grant insert on table "public"."fee_structures" to "authenticated";

grant references on table "public"."fee_structures" to "authenticated";

grant select on table "public"."fee_structures" to "authenticated";

grant trigger on table "public"."fee_structures" to "authenticated";

grant truncate on table "public"."fee_structures" to "authenticated";

grant update on table "public"."fee_structures" to "authenticated";

grant delete on table "public"."fee_structures" to "service_role";

grant insert on table "public"."fee_structures" to "service_role";

grant references on table "public"."fee_structures" to "service_role";

grant select on table "public"."fee_structures" to "service_role";

grant trigger on table "public"."fee_structures" to "service_role";

grant truncate on table "public"."fee_structures" to "service_role";

grant update on table "public"."fee_structures" to "service_role";

grant delete on table "public"."integration_endpoints" to "anon";

grant insert on table "public"."integration_endpoints" to "anon";

grant references on table "public"."integration_endpoints" to "anon";

grant select on table "public"."integration_endpoints" to "anon";

grant trigger on table "public"."integration_endpoints" to "anon";

grant truncate on table "public"."integration_endpoints" to "anon";

grant update on table "public"."integration_endpoints" to "anon";

grant delete on table "public"."integration_endpoints" to "authenticated";

grant insert on table "public"."integration_endpoints" to "authenticated";

grant references on table "public"."integration_endpoints" to "authenticated";

grant select on table "public"."integration_endpoints" to "authenticated";

grant trigger on table "public"."integration_endpoints" to "authenticated";

grant truncate on table "public"."integration_endpoints" to "authenticated";

grant update on table "public"."integration_endpoints" to "authenticated";

grant delete on table "public"."integration_endpoints" to "service_role";

grant insert on table "public"."integration_endpoints" to "service_role";

grant references on table "public"."integration_endpoints" to "service_role";

grant select on table "public"."integration_endpoints" to "service_role";

grant trigger on table "public"."integration_endpoints" to "service_role";

grant truncate on table "public"."integration_endpoints" to "service_role";

grant update on table "public"."integration_endpoints" to "service_role";

grant delete on table "public"."integration_logs" to "anon";

grant insert on table "public"."integration_logs" to "anon";

grant references on table "public"."integration_logs" to "anon";

grant select on table "public"."integration_logs" to "anon";

grant trigger on table "public"."integration_logs" to "anon";

grant truncate on table "public"."integration_logs" to "anon";

grant update on table "public"."integration_logs" to "anon";

grant delete on table "public"."integration_logs" to "authenticated";

grant insert on table "public"."integration_logs" to "authenticated";

grant references on table "public"."integration_logs" to "authenticated";

grant select on table "public"."integration_logs" to "authenticated";

grant trigger on table "public"."integration_logs" to "authenticated";

grant truncate on table "public"."integration_logs" to "authenticated";

grant update on table "public"."integration_logs" to "authenticated";

grant delete on table "public"."integration_logs" to "service_role";

grant insert on table "public"."integration_logs" to "service_role";

grant references on table "public"."integration_logs" to "service_role";

grant select on table "public"."integration_logs" to "service_role";

grant trigger on table "public"."integration_logs" to "service_role";

grant truncate on table "public"."integration_logs" to "service_role";

grant update on table "public"."integration_logs" to "service_role";

grant delete on table "public"."integration_mappings" to "anon";

grant insert on table "public"."integration_mappings" to "anon";

grant references on table "public"."integration_mappings" to "anon";

grant select on table "public"."integration_mappings" to "anon";

grant trigger on table "public"."integration_mappings" to "anon";

grant truncate on table "public"."integration_mappings" to "anon";

grant update on table "public"."integration_mappings" to "anon";

grant delete on table "public"."integration_mappings" to "authenticated";

grant insert on table "public"."integration_mappings" to "authenticated";

grant references on table "public"."integration_mappings" to "authenticated";

grant select on table "public"."integration_mappings" to "authenticated";

grant trigger on table "public"."integration_mappings" to "authenticated";

grant truncate on table "public"."integration_mappings" to "authenticated";

grant update on table "public"."integration_mappings" to "authenticated";

grant delete on table "public"."integration_mappings" to "service_role";

grant insert on table "public"."integration_mappings" to "service_role";

grant references on table "public"."integration_mappings" to "service_role";

grant select on table "public"."integration_mappings" to "service_role";

grant trigger on table "public"."integration_mappings" to "service_role";

grant truncate on table "public"."integration_mappings" to "service_role";

grant update on table "public"."integration_mappings" to "service_role";

grant delete on table "public"."integrations" to "anon";

grant insert on table "public"."integrations" to "anon";

grant references on table "public"."integrations" to "anon";

grant select on table "public"."integrations" to "anon";

grant trigger on table "public"."integrations" to "anon";

grant truncate on table "public"."integrations" to "anon";

grant update on table "public"."integrations" to "anon";

grant delete on table "public"."integrations" to "authenticated";

grant insert on table "public"."integrations" to "authenticated";

grant references on table "public"."integrations" to "authenticated";

grant select on table "public"."integrations" to "authenticated";

grant trigger on table "public"."integrations" to "authenticated";

grant truncate on table "public"."integrations" to "authenticated";

grant update on table "public"."integrations" to "authenticated";

grant delete on table "public"."integrations" to "service_role";

grant insert on table "public"."integrations" to "service_role";

grant references on table "public"."integrations" to "service_role";

grant select on table "public"."integrations" to "service_role";

grant trigger on table "public"."integrations" to "service_role";

grant truncate on table "public"."integrations" to "service_role";

grant update on table "public"."integrations" to "service_role";

grant delete on table "public"."invoices" to "anon";

grant insert on table "public"."invoices" to "anon";

grant references on table "public"."invoices" to "anon";

grant select on table "public"."invoices" to "anon";

grant trigger on table "public"."invoices" to "anon";

grant truncate on table "public"."invoices" to "anon";

grant update on table "public"."invoices" to "anon";

grant delete on table "public"."invoices" to "authenticated";

grant insert on table "public"."invoices" to "authenticated";

grant references on table "public"."invoices" to "authenticated";

grant select on table "public"."invoices" to "authenticated";

grant trigger on table "public"."invoices" to "authenticated";

grant truncate on table "public"."invoices" to "authenticated";

grant update on table "public"."invoices" to "authenticated";

grant delete on table "public"."invoices" to "service_role";

grant insert on table "public"."invoices" to "service_role";

grant references on table "public"."invoices" to "service_role";

grant select on table "public"."invoices" to "service_role";

grant trigger on table "public"."invoices" to "service_role";

grant truncate on table "public"."invoices" to "service_role";

grant update on table "public"."invoices" to "service_role";

grant delete on table "public"."ledger_entries" to "anon";

grant insert on table "public"."ledger_entries" to "anon";

grant references on table "public"."ledger_entries" to "anon";

grant select on table "public"."ledger_entries" to "anon";

grant trigger on table "public"."ledger_entries" to "anon";

grant truncate on table "public"."ledger_entries" to "anon";

grant update on table "public"."ledger_entries" to "anon";

grant delete on table "public"."ledger_entries" to "authenticated";

grant insert on table "public"."ledger_entries" to "authenticated";

grant references on table "public"."ledger_entries" to "authenticated";

grant select on table "public"."ledger_entries" to "authenticated";

grant trigger on table "public"."ledger_entries" to "authenticated";

grant truncate on table "public"."ledger_entries" to "authenticated";

grant update on table "public"."ledger_entries" to "authenticated";

grant delete on table "public"."ledger_entries" to "service_role";

grant insert on table "public"."ledger_entries" to "service_role";

grant references on table "public"."ledger_entries" to "service_role";

grant select on table "public"."ledger_entries" to "service_role";

grant trigger on table "public"."ledger_entries" to "service_role";

grant truncate on table "public"."ledger_entries" to "service_role";

grant update on table "public"."ledger_entries" to "service_role";

grant delete on table "public"."monitoring_thresholds" to "anon";

grant insert on table "public"."monitoring_thresholds" to "anon";

grant references on table "public"."monitoring_thresholds" to "anon";

grant select on table "public"."monitoring_thresholds" to "anon";

grant trigger on table "public"."monitoring_thresholds" to "anon";

grant truncate on table "public"."monitoring_thresholds" to "anon";

grant update on table "public"."monitoring_thresholds" to "anon";

grant delete on table "public"."monitoring_thresholds" to "authenticated";

grant insert on table "public"."monitoring_thresholds" to "authenticated";

grant references on table "public"."monitoring_thresholds" to "authenticated";

grant select on table "public"."monitoring_thresholds" to "authenticated";

grant trigger on table "public"."monitoring_thresholds" to "authenticated";

grant truncate on table "public"."monitoring_thresholds" to "authenticated";

grant update on table "public"."monitoring_thresholds" to "authenticated";

grant delete on table "public"."monitoring_thresholds" to "service_role";

grant insert on table "public"."monitoring_thresholds" to "service_role";

grant references on table "public"."monitoring_thresholds" to "service_role";

grant select on table "public"."monitoring_thresholds" to "service_role";

grant trigger on table "public"."monitoring_thresholds" to "service_role";

grant truncate on table "public"."monitoring_thresholds" to "service_role";

grant update on table "public"."monitoring_thresholds" to "service_role";

grant delete on table "public"."notification_settings" to "anon";

grant insert on table "public"."notification_settings" to "anon";

grant references on table "public"."notification_settings" to "anon";

grant select on table "public"."notification_settings" to "anon";

grant trigger on table "public"."notification_settings" to "anon";

grant truncate on table "public"."notification_settings" to "anon";

grant update on table "public"."notification_settings" to "anon";

grant delete on table "public"."notification_settings" to "authenticated";

grant insert on table "public"."notification_settings" to "authenticated";

grant references on table "public"."notification_settings" to "authenticated";

grant select on table "public"."notification_settings" to "authenticated";

grant trigger on table "public"."notification_settings" to "authenticated";

grant truncate on table "public"."notification_settings" to "authenticated";

grant update on table "public"."notification_settings" to "authenticated";

grant delete on table "public"."notification_settings" to "service_role";

grant insert on table "public"."notification_settings" to "service_role";

grant references on table "public"."notification_settings" to "service_role";

grant select on table "public"."notification_settings" to "service_role";

grant trigger on table "public"."notification_settings" to "service_role";

grant truncate on table "public"."notification_settings" to "service_role";

grant update on table "public"."notification_settings" to "service_role";

grant delete on table "public"."notification_templates" to "anon";

grant insert on table "public"."notification_templates" to "anon";

grant references on table "public"."notification_templates" to "anon";

grant select on table "public"."notification_templates" to "anon";

grant trigger on table "public"."notification_templates" to "anon";

grant truncate on table "public"."notification_templates" to "anon";

grant update on table "public"."notification_templates" to "anon";

grant delete on table "public"."notification_templates" to "authenticated";

grant insert on table "public"."notification_templates" to "authenticated";

grant references on table "public"."notification_templates" to "authenticated";

grant select on table "public"."notification_templates" to "authenticated";

grant trigger on table "public"."notification_templates" to "authenticated";

grant truncate on table "public"."notification_templates" to "authenticated";

grant update on table "public"."notification_templates" to "authenticated";

grant delete on table "public"."notification_templates" to "service_role";

grant insert on table "public"."notification_templates" to "service_role";

grant references on table "public"."notification_templates" to "service_role";

grant select on table "public"."notification_templates" to "service_role";

grant trigger on table "public"."notification_templates" to "service_role";

grant truncate on table "public"."notification_templates" to "service_role";

grant update on table "public"."notification_templates" to "service_role";

grant delete on table "public"."report_exports" to "anon";

grant insert on table "public"."report_exports" to "anon";

grant references on table "public"."report_exports" to "anon";

grant select on table "public"."report_exports" to "anon";

grant trigger on table "public"."report_exports" to "anon";

grant truncate on table "public"."report_exports" to "anon";

grant update on table "public"."report_exports" to "anon";

grant delete on table "public"."report_exports" to "authenticated";

grant insert on table "public"."report_exports" to "authenticated";

grant references on table "public"."report_exports" to "authenticated";

grant select on table "public"."report_exports" to "authenticated";

grant trigger on table "public"."report_exports" to "authenticated";

grant truncate on table "public"."report_exports" to "authenticated";

grant update on table "public"."report_exports" to "authenticated";

grant delete on table "public"."report_exports" to "service_role";

grant insert on table "public"."report_exports" to "service_role";

grant references on table "public"."report_exports" to "service_role";

grant select on table "public"."report_exports" to "service_role";

grant trigger on table "public"."report_exports" to "service_role";

grant truncate on table "public"."report_exports" to "service_role";

grant update on table "public"."report_exports" to "service_role";

grant delete on table "public"."report_templates" to "anon";

grant insert on table "public"."report_templates" to "anon";

grant references on table "public"."report_templates" to "anon";

grant select on table "public"."report_templates" to "anon";

grant trigger on table "public"."report_templates" to "anon";

grant truncate on table "public"."report_templates" to "anon";

grant update on table "public"."report_templates" to "anon";

grant delete on table "public"."report_templates" to "authenticated";

grant insert on table "public"."report_templates" to "authenticated";

grant references on table "public"."report_templates" to "authenticated";

grant select on table "public"."report_templates" to "authenticated";

grant trigger on table "public"."report_templates" to "authenticated";

grant truncate on table "public"."report_templates" to "authenticated";

grant update on table "public"."report_templates" to "authenticated";

grant delete on table "public"."report_templates" to "service_role";

grant insert on table "public"."report_templates" to "service_role";

grant references on table "public"."report_templates" to "service_role";

grant select on table "public"."report_templates" to "service_role";

grant trigger on table "public"."report_templates" to "service_role";

grant truncate on table "public"."report_templates" to "service_role";

grant update on table "public"."report_templates" to "service_role";

grant delete on table "public"."report_visualizations" to "anon";

grant insert on table "public"."report_visualizations" to "anon";

grant references on table "public"."report_visualizations" to "anon";

grant select on table "public"."report_visualizations" to "anon";

grant trigger on table "public"."report_visualizations" to "anon";

grant truncate on table "public"."report_visualizations" to "anon";

grant update on table "public"."report_visualizations" to "anon";

grant delete on table "public"."report_visualizations" to "authenticated";

grant insert on table "public"."report_visualizations" to "authenticated";

grant references on table "public"."report_visualizations" to "authenticated";

grant select on table "public"."report_visualizations" to "authenticated";

grant trigger on table "public"."report_visualizations" to "authenticated";

grant truncate on table "public"."report_visualizations" to "authenticated";

grant update on table "public"."report_visualizations" to "authenticated";

grant delete on table "public"."report_visualizations" to "service_role";

grant insert on table "public"."report_visualizations" to "service_role";

grant references on table "public"."report_visualizations" to "service_role";

grant select on table "public"."report_visualizations" to "service_role";

grant trigger on table "public"."report_visualizations" to "service_role";

grant truncate on table "public"."report_visualizations" to "service_role";

grant update on table "public"."report_visualizations" to "service_role";

grant delete on table "public"."scheduled_reports" to "anon";

grant insert on table "public"."scheduled_reports" to "anon";

grant references on table "public"."scheduled_reports" to "anon";

grant select on table "public"."scheduled_reports" to "anon";

grant trigger on table "public"."scheduled_reports" to "anon";

grant truncate on table "public"."scheduled_reports" to "anon";

grant update on table "public"."scheduled_reports" to "anon";

grant delete on table "public"."scheduled_reports" to "authenticated";

grant insert on table "public"."scheduled_reports" to "authenticated";

grant references on table "public"."scheduled_reports" to "authenticated";

grant select on table "public"."scheduled_reports" to "authenticated";

grant trigger on table "public"."scheduled_reports" to "authenticated";

grant truncate on table "public"."scheduled_reports" to "authenticated";

grant update on table "public"."scheduled_reports" to "authenticated";

grant delete on table "public"."scheduled_reports" to "service_role";

grant insert on table "public"."scheduled_reports" to "service_role";

grant references on table "public"."scheduled_reports" to "service_role";

grant select on table "public"."scheduled_reports" to "service_role";

grant trigger on table "public"."scheduled_reports" to "service_role";

grant truncate on table "public"."scheduled_reports" to "service_role";

grant update on table "public"."scheduled_reports" to "service_role";

grant delete on table "public"."smart_contracts" to "anon";

grant insert on table "public"."smart_contracts" to "anon";

grant references on table "public"."smart_contracts" to "anon";

grant select on table "public"."smart_contracts" to "anon";

grant trigger on table "public"."smart_contracts" to "anon";

grant truncate on table "public"."smart_contracts" to "anon";

grant update on table "public"."smart_contracts" to "anon";

grant delete on table "public"."smart_contracts" to "authenticated";

grant insert on table "public"."smart_contracts" to "authenticated";

grant references on table "public"."smart_contracts" to "authenticated";

grant select on table "public"."smart_contracts" to "authenticated";

grant trigger on table "public"."smart_contracts" to "authenticated";

grant truncate on table "public"."smart_contracts" to "authenticated";

grant update on table "public"."smart_contracts" to "authenticated";

grant delete on table "public"."smart_contracts" to "service_role";

grant insert on table "public"."smart_contracts" to "service_role";

grant references on table "public"."smart_contracts" to "service_role";

grant select on table "public"."smart_contracts" to "service_role";

grant trigger on table "public"."smart_contracts" to "service_role";

grant truncate on table "public"."smart_contracts" to "service_role";

grant update on table "public"."smart_contracts" to "service_role";

grant delete on table "public"."tenants" to "anon";

grant insert on table "public"."tenants" to "anon";

grant references on table "public"."tenants" to "anon";

grant select on table "public"."tenants" to "anon";

grant trigger on table "public"."tenants" to "anon";

grant truncate on table "public"."tenants" to "anon";

grant update on table "public"."tenants" to "anon";

grant delete on table "public"."tenants" to "authenticated";

grant insert on table "public"."tenants" to "authenticated";

grant references on table "public"."tenants" to "authenticated";

grant select on table "public"."tenants" to "authenticated";

grant trigger on table "public"."tenants" to "authenticated";

grant truncate on table "public"."tenants" to "authenticated";

grant update on table "public"."tenants" to "authenticated";

grant delete on table "public"."tenants" to "service_role";

grant insert on table "public"."tenants" to "service_role";

grant references on table "public"."tenants" to "service_role";

grant select on table "public"."tenants" to "service_role";

grant trigger on table "public"."tenants" to "service_role";

grant truncate on table "public"."tenants" to "service_role";

grant update on table "public"."tenants" to "service_role";

grant delete on table "public"."transaction_fees" to "anon";

grant insert on table "public"."transaction_fees" to "anon";

grant references on table "public"."transaction_fees" to "anon";

grant select on table "public"."transaction_fees" to "anon";

grant trigger on table "public"."transaction_fees" to "anon";

grant truncate on table "public"."transaction_fees" to "anon";

grant update on table "public"."transaction_fees" to "anon";

grant delete on table "public"."transaction_fees" to "authenticated";

grant insert on table "public"."transaction_fees" to "authenticated";

grant references on table "public"."transaction_fees" to "authenticated";

grant select on table "public"."transaction_fees" to "authenticated";

grant trigger on table "public"."transaction_fees" to "authenticated";

grant truncate on table "public"."transaction_fees" to "authenticated";

grant update on table "public"."transaction_fees" to "authenticated";

grant delete on table "public"."transaction_fees" to "service_role";

grant insert on table "public"."transaction_fees" to "service_role";

grant references on table "public"."transaction_fees" to "service_role";

grant select on table "public"."transaction_fees" to "service_role";

grant trigger on table "public"."transaction_fees" to "service_role";

grant truncate on table "public"."transaction_fees" to "service_role";

grant update on table "public"."transaction_fees" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

grant delete on table "public"."workflow_assignments" to "anon";

grant insert on table "public"."workflow_assignments" to "anon";

grant references on table "public"."workflow_assignments" to "anon";

grant select on table "public"."workflow_assignments" to "anon";

grant trigger on table "public"."workflow_assignments" to "anon";

grant truncate on table "public"."workflow_assignments" to "anon";

grant update on table "public"."workflow_assignments" to "anon";

grant delete on table "public"."workflow_assignments" to "authenticated";

grant insert on table "public"."workflow_assignments" to "authenticated";

grant references on table "public"."workflow_assignments" to "authenticated";

grant select on table "public"."workflow_assignments" to "authenticated";

grant trigger on table "public"."workflow_assignments" to "authenticated";

grant truncate on table "public"."workflow_assignments" to "authenticated";

grant update on table "public"."workflow_assignments" to "authenticated";

grant delete on table "public"."workflow_assignments" to "service_role";

grant insert on table "public"."workflow_assignments" to "service_role";

grant references on table "public"."workflow_assignments" to "service_role";

grant select on table "public"."workflow_assignments" to "service_role";

grant trigger on table "public"."workflow_assignments" to "service_role";

grant truncate on table "public"."workflow_assignments" to "service_role";

grant update on table "public"."workflow_assignments" to "service_role";

grant delete on table "public"."workflow_comments" to "anon";

grant insert on table "public"."workflow_comments" to "anon";

grant references on table "public"."workflow_comments" to "anon";

grant select on table "public"."workflow_comments" to "anon";

grant trigger on table "public"."workflow_comments" to "anon";

grant truncate on table "public"."workflow_comments" to "anon";

grant update on table "public"."workflow_comments" to "anon";

grant delete on table "public"."workflow_comments" to "authenticated";

grant insert on table "public"."workflow_comments" to "authenticated";

grant references on table "public"."workflow_comments" to "authenticated";

grant select on table "public"."workflow_comments" to "authenticated";

grant trigger on table "public"."workflow_comments" to "authenticated";

grant truncate on table "public"."workflow_comments" to "authenticated";

grant update on table "public"."workflow_comments" to "authenticated";

grant delete on table "public"."workflow_comments" to "service_role";

grant insert on table "public"."workflow_comments" to "service_role";

grant references on table "public"."workflow_comments" to "service_role";

grant select on table "public"."workflow_comments" to "service_role";

grant trigger on table "public"."workflow_comments" to "service_role";

grant truncate on table "public"."workflow_comments" to "service_role";

grant update on table "public"."workflow_comments" to "service_role";

grant delete on table "public"."workflow_definitions" to "anon";

grant insert on table "public"."workflow_definitions" to "anon";

grant references on table "public"."workflow_definitions" to "anon";

grant select on table "public"."workflow_definitions" to "anon";

grant trigger on table "public"."workflow_definitions" to "anon";

grant truncate on table "public"."workflow_definitions" to "anon";

grant update on table "public"."workflow_definitions" to "anon";

grant delete on table "public"."workflow_definitions" to "authenticated";

grant insert on table "public"."workflow_definitions" to "authenticated";

grant references on table "public"."workflow_definitions" to "authenticated";

grant select on table "public"."workflow_definitions" to "authenticated";

grant trigger on table "public"."workflow_definitions" to "authenticated";

grant truncate on table "public"."workflow_definitions" to "authenticated";

grant update on table "public"."workflow_definitions" to "authenticated";

grant delete on table "public"."workflow_definitions" to "service_role";

grant insert on table "public"."workflow_definitions" to "service_role";

grant references on table "public"."workflow_definitions" to "service_role";

grant select on table "public"."workflow_definitions" to "service_role";

grant trigger on table "public"."workflow_definitions" to "service_role";

grant truncate on table "public"."workflow_definitions" to "service_role";

grant update on table "public"."workflow_definitions" to "service_role";

grant delete on table "public"."workflow_history" to "anon";

grant insert on table "public"."workflow_history" to "anon";

grant references on table "public"."workflow_history" to "anon";

grant select on table "public"."workflow_history" to "anon";

grant trigger on table "public"."workflow_history" to "anon";

grant truncate on table "public"."workflow_history" to "anon";

grant update on table "public"."workflow_history" to "anon";

grant delete on table "public"."workflow_history" to "authenticated";

grant insert on table "public"."workflow_history" to "authenticated";

grant references on table "public"."workflow_history" to "authenticated";

grant select on table "public"."workflow_history" to "authenticated";

grant trigger on table "public"."workflow_history" to "authenticated";

grant truncate on table "public"."workflow_history" to "authenticated";

grant update on table "public"."workflow_history" to "authenticated";

grant delete on table "public"."workflow_history" to "service_role";

grant insert on table "public"."workflow_history" to "service_role";

grant references on table "public"."workflow_history" to "service_role";

grant select on table "public"."workflow_history" to "service_role";

grant trigger on table "public"."workflow_history" to "service_role";

grant truncate on table "public"."workflow_history" to "service_role";

grant update on table "public"."workflow_history" to "service_role";

grant delete on table "public"."workflow_instances" to "anon";

grant insert on table "public"."workflow_instances" to "anon";

grant references on table "public"."workflow_instances" to "anon";

grant select on table "public"."workflow_instances" to "anon";

grant trigger on table "public"."workflow_instances" to "anon";

grant truncate on table "public"."workflow_instances" to "anon";

grant update on table "public"."workflow_instances" to "anon";

grant delete on table "public"."workflow_instances" to "authenticated";

grant insert on table "public"."workflow_instances" to "authenticated";

grant references on table "public"."workflow_instances" to "authenticated";

grant select on table "public"."workflow_instances" to "authenticated";

grant trigger on table "public"."workflow_instances" to "authenticated";

grant truncate on table "public"."workflow_instances" to "authenticated";

grant update on table "public"."workflow_instances" to "authenticated";

grant delete on table "public"."workflow_instances" to "service_role";

grant insert on table "public"."workflow_instances" to "service_role";

grant references on table "public"."workflow_instances" to "service_role";

grant select on table "public"."workflow_instances" to "service_role";

grant trigger on table "public"."workflow_instances" to "service_role";

grant truncate on table "public"."workflow_instances" to "service_role";

grant update on table "public"."workflow_instances" to "service_role";

grant delete on table "public"."workflow_metrics" to "anon";

grant insert on table "public"."workflow_metrics" to "anon";

grant references on table "public"."workflow_metrics" to "anon";

grant select on table "public"."workflow_metrics" to "anon";

grant trigger on table "public"."workflow_metrics" to "anon";

grant truncate on table "public"."workflow_metrics" to "anon";

grant update on table "public"."workflow_metrics" to "anon";

grant delete on table "public"."workflow_metrics" to "authenticated";

grant insert on table "public"."workflow_metrics" to "authenticated";

grant references on table "public"."workflow_metrics" to "authenticated";

grant select on table "public"."workflow_metrics" to "authenticated";

grant trigger on table "public"."workflow_metrics" to "authenticated";

grant truncate on table "public"."workflow_metrics" to "authenticated";

grant update on table "public"."workflow_metrics" to "authenticated";

grant delete on table "public"."workflow_metrics" to "service_role";

grant insert on table "public"."workflow_metrics" to "service_role";

grant references on table "public"."workflow_metrics" to "service_role";

grant select on table "public"."workflow_metrics" to "service_role";

grant trigger on table "public"."workflow_metrics" to "service_role";

grant truncate on table "public"."workflow_metrics" to "service_role";

grant update on table "public"."workflow_metrics" to "service_role";

grant delete on table "public"."workflow_steps" to "anon";

grant insert on table "public"."workflow_steps" to "anon";

grant references on table "public"."workflow_steps" to "anon";

grant select on table "public"."workflow_steps" to "anon";

grant trigger on table "public"."workflow_steps" to "anon";

grant truncate on table "public"."workflow_steps" to "anon";

grant update on table "public"."workflow_steps" to "anon";

grant delete on table "public"."workflow_steps" to "authenticated";

grant insert on table "public"."workflow_steps" to "authenticated";

grant references on table "public"."workflow_steps" to "authenticated";

grant select on table "public"."workflow_steps" to "authenticated";

grant trigger on table "public"."workflow_steps" to "authenticated";

grant truncate on table "public"."workflow_steps" to "authenticated";

grant update on table "public"."workflow_steps" to "authenticated";

grant delete on table "public"."workflow_steps" to "service_role";

grant insert on table "public"."workflow_steps" to "service_role";

grant references on table "public"."workflow_steps" to "service_role";

grant select on table "public"."workflow_steps" to "service_role";

grant trigger on table "public"."workflow_steps" to "service_role";

grant truncate on table "public"."workflow_steps" to "service_role";

grant update on table "public"."workflow_steps" to "service_role";

grant delete on table "public"."workflow_templates" to "anon";

grant insert on table "public"."workflow_templates" to "anon";

grant references on table "public"."workflow_templates" to "anon";

grant select on table "public"."workflow_templates" to "anon";

grant trigger on table "public"."workflow_templates" to "anon";

grant truncate on table "public"."workflow_templates" to "anon";

grant update on table "public"."workflow_templates" to "anon";

grant delete on table "public"."workflow_templates" to "authenticated";

grant insert on table "public"."workflow_templates" to "authenticated";

grant references on table "public"."workflow_templates" to "authenticated";

grant select on table "public"."workflow_templates" to "authenticated";

grant trigger on table "public"."workflow_templates" to "authenticated";

grant truncate on table "public"."workflow_templates" to "authenticated";

grant update on table "public"."workflow_templates" to "authenticated";

grant delete on table "public"."workflow_templates" to "service_role";

grant insert on table "public"."workflow_templates" to "service_role";

grant references on table "public"."workflow_templates" to "service_role";

grant select on table "public"."workflow_templates" to "service_role";

grant trigger on table "public"."workflow_templates" to "service_role";

grant truncate on table "public"."workflow_templates" to "service_role";

grant update on table "public"."workflow_templates" to "service_role";

grant delete on table "public"."workflow_transitions" to "anon";

grant insert on table "public"."workflow_transitions" to "anon";

grant references on table "public"."workflow_transitions" to "anon";

grant select on table "public"."workflow_transitions" to "anon";

grant trigger on table "public"."workflow_transitions" to "anon";

grant truncate on table "public"."workflow_transitions" to "anon";

grant update on table "public"."workflow_transitions" to "anon";

grant delete on table "public"."workflow_transitions" to "authenticated";

grant insert on table "public"."workflow_transitions" to "authenticated";

grant references on table "public"."workflow_transitions" to "authenticated";

grant select on table "public"."workflow_transitions" to "authenticated";

grant trigger on table "public"."workflow_transitions" to "authenticated";

grant truncate on table "public"."workflow_transitions" to "authenticated";

grant update on table "public"."workflow_transitions" to "authenticated";

grant delete on table "public"."workflow_transitions" to "service_role";

grant insert on table "public"."workflow_transitions" to "service_role";

grant references on table "public"."workflow_transitions" to "service_role";

grant select on table "public"."workflow_transitions" to "service_role";

grant trigger on table "public"."workflow_transitions" to "service_role";

grant truncate on table "public"."workflow_transitions" to "service_role";

grant update on table "public"."workflow_transitions" to "service_role";

grant delete on table "public"."workflow_validations" to "anon";

grant insert on table "public"."workflow_validations" to "anon";

grant references on table "public"."workflow_validations" to "anon";

grant select on table "public"."workflow_validations" to "anon";

grant trigger on table "public"."workflow_validations" to "anon";

grant truncate on table "public"."workflow_validations" to "anon";

grant update on table "public"."workflow_validations" to "anon";

grant delete on table "public"."workflow_validations" to "authenticated";

grant insert on table "public"."workflow_validations" to "authenticated";

grant references on table "public"."workflow_validations" to "authenticated";

grant select on table "public"."workflow_validations" to "authenticated";

grant trigger on table "public"."workflow_validations" to "authenticated";

grant truncate on table "public"."workflow_validations" to "authenticated";

grant update on table "public"."workflow_validations" to "authenticated";

grant delete on table "public"."workflow_validations" to "service_role";

grant insert on table "public"."workflow_validations" to "service_role";

grant references on table "public"."workflow_validations" to "service_role";

grant select on table "public"."workflow_validations" to "service_role";

grant trigger on table "public"."workflow_validations" to "service_role";

grant truncate on table "public"."workflow_validations" to "service_role";

grant update on table "public"."workflow_validations" to "service_role";

create policy "Platform owners can manage account balances"
on "public"."account_balances"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN tenants t ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'platform_owner'::text)))));


create policy "Platform owners can manage accounts"
on "public"."accounts"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN tenants t ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'platform_owner'::text)))));


create policy "Users can view their tenant's analytics dimensions"
on "public"."analytics_dimensions"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's analytics metrics"
on "public"."analytics_metrics"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can manage their tenant's analytics reports"
on "public"."analytics_reports"
as permissive
for all
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's API endpoints"
on "public"."api_endpoints"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can manage their tenant's API keys"
on "public"."api_keys"
as permissive
for all
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's API logs"
on "public"."api_logs"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's API versions"
on "public"."api_versions"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's approval matrices"
on "public"."approval_matrices"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's audit logs"
on "public"."audit_logs"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Financial institutions can update their assigned bills"
on "public"."bills_of_exchange"
as permissive
for update
to public
using ((financial_institution_id = auth.uid()))
with check ((financial_institution_id = auth.uid()));


create policy "Financial institutions can view endorsed bills"
on "public"."bills_of_exchange"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (tenants t
     JOIN users u ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'financial_institution'::text) AND (bills_of_exchange.status = 'endorsed'::text)))));


create policy "Platform owners can manage all bills"
on "public"."bills_of_exchange"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN tenants t ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'platform_owner'::text)))));


create policy "Suppliers can view their bills"
on "public"."bills_of_exchange"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM invoices
  WHERE ((invoices.id = bills_of_exchange.invoice_id) AND (invoices.supplier_id = auth.uid())))));


create policy "Users can view their tenant's compliance audits"
on "public"."compliance_audits"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's compliance reports"
on "public"."compliance_reports"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's compliance requirements"
on "public"."compliance_requirements"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's alerts"
on "public"."contract_alerts"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's monitoring metrics"
on "public"."contract_monitoring_metrics"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's credit limits"
on "public"."credit_limits"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Platform owners can manage fee structures"
on "public"."fee_structures"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN tenants t ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'platform_owner'::text)))));


create policy "Users can view their tenant's integration endpoints"
on "public"."integration_endpoints"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's integration logs"
on "public"."integration_logs"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's integration mappings"
on "public"."integration_mappings"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's integrations"
on "public"."integrations"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Buyers can view invoices where they are the buyer"
on "public"."invoices"
as permissive
for select
to public
using ((auth.uid() = buyer_id));


create policy "Platform owners can view all invoices"
on "public"."invoices"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN tenants t ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'platform_owner'::text)))));


create policy "Suppliers can create invoices"
on "public"."invoices"
as permissive
for insert
to public
with check (((auth.uid() = supplier_id) AND (EXISTS ( SELECT 1
   FROM (tenants t
     JOIN users u ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'supplier'::text))))));


create policy "Suppliers can view their own invoices"
on "public"."invoices"
as permissive
for select
to public
using ((auth.uid() = supplier_id));


create policy "Platform owners can manage ledger entries"
on "public"."ledger_entries"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN tenants t ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'platform_owner'::text)))));


create policy "Users can manage their tenant's thresholds"
on "public"."monitoring_thresholds"
as permissive
for all
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can manage their notification settings"
on "public"."notification_settings"
as permissive
for all
to public
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));


create policy "Users can view their tenant's report exports"
on "public"."report_exports"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's report templates"
on "public"."report_templates"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can manage their tenant's report visualizations"
on "public"."report_visualizations"
as permissive
for all
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can manage their tenant's scheduled reports"
on "public"."scheduled_reports"
as permissive
for all
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Platform owners can manage contracts"
on "public"."smart_contracts"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM (users u
     JOIN tenants t ON ((u.tenant_id = t.id)))
  WHERE ((u.id = auth.uid()) AND (t.role = 'platform_owner'::text)))));


create policy "Users can view their contracts"
on "public"."smart_contracts"
as permissive
for select
to public
using (((created_by = auth.uid()) OR (tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid())))));


create policy "Tenants can view their own data"
on "public"."tenants"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.tenant_id = tenants.id))));


create policy "Users can view their own transaction fees"
on "public"."transaction_fees"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM invoices i
  WHERE ((i.id = transaction_fees.invoice_id) AND (i.supplier_id = auth.uid())))));


create policy "Users can view profiles in their tenant"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() IN ( SELECT users_1.id
   FROM users users_1
  WHERE (users_1.tenant_id = users_1.tenant_id))));


create policy "Users can manage their assigned workflow steps"
on "public"."workflow_assignments"
as permissive
for all
to public
using (((assigned_to = auth.uid()) OR (EXISTS ( SELECT 1
   FROM ((workflow_steps ws
     JOIN users u ON ((u.tenant_id = ws.tenant_id)))
     JOIN tenants t ON ((t.id = u.tenant_id)))
  WHERE ((ws.id = workflow_assignments.step_id) AND (u.id = auth.uid()) AND (t.role = ANY (ws.required_roles)))))));


create policy "Users can manage their workflow comments"
on "public"."workflow_comments"
as permissive
for all
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's workflow definitions"
on "public"."workflow_definitions"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's workflow instances"
on "public"."workflow_instances"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's workflow metrics"
on "public"."workflow_metrics"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's workflow templates"
on "public"."workflow_templates"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


create policy "Users can view their tenant's workflow validations"
on "public"."workflow_validations"
as permissive
for select
to public
using ((tenant_id IN ( SELECT users.tenant_id
   FROM users
  WHERE (users.id = auth.uid()))));


CREATE TRIGGER refresh_analytics_performance_metrics_trigger AFTER INSERT OR DELETE OR UPDATE ON public.analytics_metrics FOR EACH STATEMENT EXECUTE FUNCTION refresh_analytics_performance_metrics();

CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON public.bills_of_exchange FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER check_monitoring_thresholds_trigger AFTER INSERT ON public.contract_monitoring_metrics FOR EACH ROW EXECUTE FUNCTION check_monitoring_thresholds();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON public.integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_account_balance_trigger AFTER INSERT ON public.ledger_entries FOR EACH ROW EXECUTE FUNCTION update_account_balance();

CREATE TRIGGER log_workflow_history_trigger AFTER UPDATE ON public.workflow_instances FOR EACH ROW WHEN (((old.current_step <> new.current_step) OR (old.status <> new.status))) EXECUTE FUNCTION log_workflow_history();


