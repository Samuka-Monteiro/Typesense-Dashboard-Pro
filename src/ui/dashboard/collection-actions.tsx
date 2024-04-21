"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  SquareEqual,
  WandSparkles,
  BookPlus,
  BookMinus,
  Download,
  Bolt,
} from "lucide-react";
import CollectionCombobox from "../collection-combobox";

export default function CollectionActions() {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-[287px] relative">
      <CollectionCombobox value={value} setValue={setValue} />
      {value && (
        <div className="p-2 mt-4">
          <Button variant="ghost" className="w-full justify-start">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <SquareEqual className="mr-2 h-4 w-4" />
            Synonyms
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <WandSparkles className="mr-2 h-4 w-4" />
            Curation
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BookPlus className="mr-2 h-4 w-4" />
            Add documents
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BookMinus className="mr-2 h-4 w-4" />
            Delete documents
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Download className="mr-2 h-4 w-4" />
            Export documents
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bolt className="mr-2 h-4 w-4" />
            Collection settings
          </Button>
        </div>
      )}
    </div>
  );
}
