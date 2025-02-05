import { Migration } from '@mikro-orm/migrations';

export class Migration20250205192103 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "fiscal" ("id" text not null, "country" text not null, "data" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "fiscal_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_fiscal_deleted_at" ON "fiscal" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "taxinvoice" ("id" text not null, "country" text not null, "data" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "taxinvoice_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_taxinvoice_deleted_at" ON "taxinvoice" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "fiscal" cascade;`);

    this.addSql(`drop table if exists "taxinvoice" cascade;`);
  }

}
