CREATE POLICY "Enable update for all users" ON "public"."internship_applications" AS PERMISSIVE FOR UPDATE TO public USING (true);
