import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
