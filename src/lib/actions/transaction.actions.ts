"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../server/appwrite";
import { channel } from "diagnostics_channel";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSCATION_COLLECTION_ID,
} = process.env;

export const createTransaction = async (transction: CreateTransactionProps) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSCATION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: "online",
        category: "Transfer",
        ...transction,
      }
    );

    return parseStringify(newTransaction);
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSCATION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId)]
    );
    const receiverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSCATION_COLLECTION_ID!,
      [Query.equal("receiverBankId", bankId)]
    );

    const transaction = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...receiverTransactions.documents,
        ...senderTransactions.documents,
      ],
    };
    return parseStringify(transaction);
  } catch (error) {
    console.log(error);
  }
};
