import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StepProps {
  number: string;
  title: string;
  description?: string;
  Icon?: React.ElementType;
  children?: ReactNode;
}

const Step: React.FC<StepProps> = ({ number, title, description, Icon, children }) => {
  return (
    <div className="flex flex-wrap -m-2">
      <div className="w-auto p-2">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="block pb-4">
            <div className="flex items-center justify-center w-10 h-10 border border-neutral-200 rounded-full">
              { Icon ? <Icon /> : <span className="text-lg font-semibold">{ number }</span> }
            </div>
          </div>
          <div className="w-px h-full border border-dashed"></div>
        </div>
      </div>
      <div className="flex-1 p-2">
        <h3 className="font-heading mb-0.5 text-lg font-semibold">{ title }</h3>
        { description && <p className="mb-7 text-neutral-500">{ description }</p> }
        { children }
      </div>
    </div>
  );
};

export default Step;
