import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import EditReport from "./EditReport";

function EditReportModal({ report }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="material-symbols-outlined">
        edit
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay">
          <Dialog.Content className="edit-content">
            <EditReport
              subject={report.subject}
              grade={report.grade}
              reportId={report._id}
              openModal={setOpen}
            />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EditReportModal;
