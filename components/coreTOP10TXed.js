import { Table } from "@mantine/core";
import Image from "next/image";
import Jazzicon from "react-jazzicon/lib/Jazzicon";
import { useStore } from "../utils/store";

function CoreTOP10TXed({ elements }) {
  elements?.forEach(function (element) {
    element.href = "/rollups/" + element.nid;
  });
  const rows = elements?.map((element, idx) => (
    <tr key={idx}>
      <td>
        <a href={element?.href}>{element?.nid}</a>
      </td>
      <td>{element?.chainId}</td>
      <td>{element?.cnt}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr className="font-dosis">
          <th>Namespace ID</th>
          <th>Chain ID</th>
          <th>Total TXs #</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default CoreTOP10TXed;
