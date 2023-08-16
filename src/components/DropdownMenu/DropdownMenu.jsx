import React, { Fragment } from "react";

const DropdownMenu = ({
  item,
  setItem,
  setActionName,
  dropdownMenus,
  setType,
}) => {
  const handler = (action) => {
    setType("edit");
    setItem(item);
  };

  return (
    <td className="px-0 py-0 capitalize text-right pr-4 whitespace-nowrap">
      <div className="dropdown dropdown-bottom dropdown-end">
        <label
          tabIndex={1}
          className={`rounded-lg px-2 py-2 w-24 focus:outline-none active:border-none ${dropdownMenus?.textColor} ${dropdownMenus?.bgColor} cursor-pointer select-none`}
        >
          {dropdownMenus?.activeAction} &nbsp;
          <i className="fa-solid fa-angle-down text-sm"></i>
        </label>
        <ul
          tabIndex={1}
          className="dropdown-content menu mt-2 m-0.5 shadow bg-whiteHigh rounded-md w-36 bg-white z-50"
        >
          {dropdownMenus?.actions?.map((action, i) => (
            <Fragment key={i}>
              {action?.action === "edit" ? (
                <label
                  onClick={() => handler(action?.action)}
                  data-hs-overlay={action?.modalName}
                >
                  <li>
                    <p
                      className={`${action?.textColor} py-2 active:bg-blackLow w-full rounded-t-md `}
                    >
                      {action?.actionName}
                    </p>
                  </li>
                </label>
              ) : (
                <label
                  onClick={() => handler(action?.action)}
                  htmlFor="confirmationPopup"
                >
                  <li>
                    <p
                      className={`${action?.textColor} py-2 active:bg-blackLow w-full rounded-t-md `}
                    >
                      {action?.actionName}
                    </p>
                  </li>
                </label>
              )}
              {dropdownMenus?.actions?.length !== i + 1 && (
                <>
                  <hr className="text-disabledColor opacity-10" />
                  <hr className="text-disabledColor opacity-10" />
                </>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </td>
  );
};

export default DropdownMenu;
