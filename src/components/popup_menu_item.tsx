interface PopupMenuItem {
  label: string;
}

export default function PopupMenuItem(props: PopupMenuItem) {
  const { label } = props;

  return <div style={{ width: "200px" }}>{label}</div>;
}
