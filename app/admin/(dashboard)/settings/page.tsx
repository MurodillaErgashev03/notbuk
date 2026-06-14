import { getSettings } from "@/lib/db/queries";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sozlamalar</h1>
        <p className="text-sm text-muted-foreground">
          Logo, sayt nomi va footer kontaktlari
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
