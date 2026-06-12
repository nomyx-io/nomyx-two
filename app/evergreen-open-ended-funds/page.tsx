import type { Metadata } from "next";

import Evergreen from "../components/Evergreen";

export const metadata: Metadata = {
  title: "Evergreen & Open-Ended Fund Tokenization | Nomyx",
  alternates: {
    canonical: "https://www.nomyx.io/evergreen-open-ended-funds",
  },
};

export default function EvergreenOpenEndedFundsPage() {
  return <Evergreen />;
}
