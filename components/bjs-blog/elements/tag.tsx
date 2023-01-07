import Link from "next/link";

export default function Tag({ item }:any) {
  if (!item) return <></>;
  return (
    <Link className="tag" href={`/`} key={item.tag}>
      {item.tag}
    </Link>
  );
}
