import { useQueryClient } from "@tanstack/react-query";

import ListItem from "@/components/ui/list-item";
import { queryPersister } from "@/lib/query/query-persister";
import { toast } from "@/lib/toast";
import { Trash2 } from "@/lib/icons";

export function ClearCacheItem() {
  const queryClient = useQueryClient();

  async function clearCache() {
    queryClient.clear();
    await queryPersister.removeClient();
    toast.success("Cached data cleared");
  }

  return (
    <ListItem
      itemLeft={(props) => <Trash2 {...props} />}
      label="Clear cached data"
      detail={false}
      onPress={clearCache}
    />
  );
}
