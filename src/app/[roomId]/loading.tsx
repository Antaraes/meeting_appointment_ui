import Spinner from "@/components/common/Spinner";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner lg />
    </div>
  );
};

export default loading;
