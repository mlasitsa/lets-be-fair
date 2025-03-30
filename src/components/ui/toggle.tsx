import React from 'react';

type ToggleProps = {
  buttonName: string;
  description?: string;
  onRoleChange: (role: string) => void;
  selectedRole?: string;
};

const Toggle = ({
  buttonName,
  description,
  onRoleChange,
  selectedRole
}: ToggleProps) => {
  const value = buttonName.toLowerCase().replace(/\s+/g, '-');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRoleChange(e.target.value);
  };

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor={value}
        className={`flex items-center justify-between gap-4 rounded border p-3 text-sm font-medium shadow-sm transition-colors 
          ${selectedRole === value ? 'border-blue-600 ring-1 ring-blue-600 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}
        `}
      >
        <div className="text-left">
          <p className="text-gray-900">{buttonName}</p>
          {description && <p className="text-gray-500">{description}</p>}
        </div>

        <input
          type="radio"
          name="role"
          value={value}
          id={value}
          className="size-5 border-gray-300"
          onChange={changeHandler}
          checked={selectedRole === value}
        />
      </label>
    </div>
  );
};

export default Toggle;
