import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

const languages = {
  ENGLISH: "English",
} as const;

export function LanguageSelector() {
  return (
    <>
      <Label className="mb-2">Preferred display language:</Label>
      <Combobox
        items={Object.values(languages)}
        defaultValue={languages.ENGLISH}
      >
        <ComboboxInput placeholder="Select a language" />
        <ComboboxContent>
          <ComboboxEmpty>No language found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
