import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Trash2, Star } from "lucide-react";
import { HistoryCardProps, HistoryItem } from "@/types/django_key_gen";


export const HistoryCard = <T extends HistoryItem>({
  history,
  onLoadFromHistory,
  onClearHistory,
  onDeleteItem,
  labelKey = "label",
  favoriteKey = "favorite",
  timestampKey = "timestamp",
}: HistoryCardProps<T>) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5" />
          History
        </CardTitle>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      {history.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No items in history
        </p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 cursor-pointer group"
              onClick={() => onLoadFromHistory(item)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{String(item[labelKey])}</p>
                  {item[favoriteKey] && (
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{String(item[timestampKey])}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);