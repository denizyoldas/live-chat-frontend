import React from "react";
import { format } from "date-fns";
import cx from "classnames";

interface Props {
  message: string;
  timestamp: number;
  user?: any;
  isSender?: boolean;
}

export default function MessageBox({
  message,
  timestamp,
  isSender = false,
  user,
}: Props) {
  return (
    <div
      className={cx("flex gap-4 items-end mb-8", {
        "flex-row-reverse": isSender,
      })}
    >
      <div className="w-14 h-14 rounded-full bg-white">
        <img
          src={"https://i.pravatar.cc/300?key=" + user?.id || "user id"}
          alt="user"
          className="w-full h-full rounded-full"
        />
      </div>
      <div
        className={cx(
          "rounded-t-2xl bg-white min-w-[212px] px-6 py-2 max-w-xs",
          {
            "rounded-bl-2xl": isSender,
            "rounded-br-2xl": !isSender,
          }
        )}
      >
        <p className="mb-2 font-bold break-words">{message}</p>
        <span className="text-slate-400 flex justify-end text-xs">
          {format(timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
}
