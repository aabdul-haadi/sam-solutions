CREATE POLICY "Enable read access for all users" ON "public"."internship_applications" AS PERMISSIVE FOR SELECT TO public USING (true);
