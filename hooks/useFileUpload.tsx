import { Input } from "@/components/ui/input";
import { allowedFileTypes } from "@/lib/data";
import { useRef } from "react";
import { toast } from "sonner";

type UseFileUploadProps = {
  onFilesSelected: (files: File[] | null) => void;
};

export function useFileUpload({ onFilesSelected }: UseFileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const isValidFile = (file: File) =>
    allowedFileTypes.some((t) => file.type.startsWith(t.type));

  const handleChange = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(isValidFile);

    if (validFiles.length !== files.length) {
      toast.warning("Some files are not supported");
      console.warn("Some files were rejected");
    }

    onFilesSelected(validFiles);
  };

  const getFileLabel = (file: File) => {
    return (
      allowedFileTypes.find((t) => file.type.startsWith(t.type))?.label ||
      "Unknown"
    );
  };

  const FileInput = () => (
    <Input
      ref={inputRef}
      type="file"
      className="hidden"
      multiple
      accept={allowedFileTypes.join(",")}
      onChange={(e) => handleChange(e.target.files)}
    />
  );

  return { openFileDialog, FileInput, getFileLabel };
}
