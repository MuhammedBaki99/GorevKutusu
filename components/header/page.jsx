import "./header.css"
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Image width={80} height={80} src={"/img/todologo.png"} />
      <h1>Görev Kutusu</h1>
    </header>
  )
}