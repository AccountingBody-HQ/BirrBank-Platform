
path = "/workspaces/HRLake-Platform/app/pricing/page.tsx"
t = open(path).read()
t = t.replace("space-y-3 mb-8", "mb-8")
t = t.replace("Get Pro — £29 / month", "Pro coming soon")
open(path, "w").write(t)
print("done")
