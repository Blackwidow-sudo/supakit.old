create table "public"."items" (
    "id" bigint generated by default as identity not null,
    "item" text not null,
    "user_id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."items" enable row level security;

CREATE UNIQUE INDEX items_pkey ON public.items USING btree (id);

alter table "public"."items" add constraint "items_pkey" PRIMARY KEY using index "items_pkey";

alter table "public"."items" add constraint "items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."items" validate constraint "items_user_id_fkey";

create policy "items_allow_delete_for_own_items"
on "public"."items"
as permissive
for delete
to authenticated
using ((auth.uid() = user_id));


create policy "items_allow_insert_for_auth_user"
on "public"."items"
as permissive
for insert
to authenticated
with check (true);


create policy "items_allow_select_for_own_items"
on "public"."items"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "items_allow_update_for_own_items"
on "public"."items"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


CREATE TRIGGER on_item_update BEFORE UPDATE ON public.items FOR EACH ROW EXECUTE FUNCTION set_updated_at();

