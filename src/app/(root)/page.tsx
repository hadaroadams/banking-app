import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

export default async function Home({
  searchParams: { id },
}: SearchParamProps) {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountData = accounts?.data;
  const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;

  // const account = await getAccount({ appwriteItemId });

  console.log(accountData);
  // console.log(account);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transaction efficiently"
          />
          <TotalBalanceBox
            accounts={[accountData]}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTION
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transaction}
        banks={[accountData?.slice(0, 2)]}
      />
    </section>
  );
}
