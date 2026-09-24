import { useQueryClient } from "@tanstack/react-query";

import { queryPersister } from "@/lib/query/query-persister";
import { toast } from "@/lib/toast";
import { Trash2 } from "@/lib/icons";
import { SettingsRow } from "./SettingsRow";

export function ClearCacheRow() {
  const queryClient = useQueryClient();

  async function clearCache() {
    queryClient.clear();
    await queryPersister.removeClient();
    toast.success("Cached data cleared");
  }

  return (
    <SettingsRow
      icon={<Trash2 className="text-primary" size={18} />}
      label="Clear cached data"
      description="Frees space and refetches everything"
      onPress={clearCache}
    />
  );
}
