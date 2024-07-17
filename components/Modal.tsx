// Modal.tsx or DialogDemo.tsx
import React from "react";

interface FormData {
  username: string;
  useremail: string;
  userphone: string;
  usermessage: string;
}

interface DialogDemoProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
}

export const DialogDemo: React.FC<DialogDemoProps> = ({
  isOpen,
  onClose,
  formData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[480px]">
        <h2 className="text-xl mb-4">Form Submission Details</h2>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-bold">Name:</td>
              <td className="border px-4 py-2">{formData.username}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Email:</td>
              <td className="border px-4 py-2">{formData.useremail}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Phone:</td>
              <td className="border px-4 py-2">{formData.userphone}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Message:</td>
              <td className="border px-4 py-2">{formData.usermessage}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 bg-slate-700 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
