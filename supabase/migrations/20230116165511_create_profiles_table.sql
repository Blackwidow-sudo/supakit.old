create table "public"."profiles" (
    "id" uuid not null,
    "username" text,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";


create policy "profiles_allow_insert_for_own_user"
on "public"."profiles"
as permissive
for insert
to authenticated
with check ((auth.uid() = id));


create policy "profiles_allow_select_for_auth_users"
on "public"."profiles"
as permissive
for select
to authenticated
using (true);


create policy "profiles_allow_update_for_own_user"
on "public"."profiles"
as permissive
for update
to authenticated
using ((auth.uid() = id));


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username'
  );

  RETURN NEW;
END;$function$
;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

