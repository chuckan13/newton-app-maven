package com.example;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.ItemPublicTokenExchangeRequest;
import com.plaid.client.request.ItemStripeTokenCreateRequest;
import com.plaid.client.response.ItemPublicTokenExchangeResponse;
import com.plaid.client.response.ItemStripeTokenCreateResponse;

import java.io.IOException;

import retrofit2.Response;

public class plaidToStripe {

    public String[] getTokens() throws IOException {
        String[] tokenArray = new String[2];

        // Using Plaid's Java bindings (https://github.com/plaid/plaid-java)
        // Use builder to create a client
        PlaidClient plaidClient = PlaidClient.newBuilder()
                .clientIdAndSecret("5ec56a381aa68500131cc8d5", "da5604395c6b5a109087e4fe544374")
                .publicKey("5475e6f532d5bc20abca96dba0c94a").sandboxBaseUrl() // Use the Sandbox.
                .build();

        // Required request parameters are always Request object constructor arguments
        Response<ItemPublicTokenExchangeResponse> exchangeResponse = plaidClient.service()
                .itemPublicTokenExchange(
                        new ItemPublicTokenExchangeRequest("public-sandbox-6c303c7f-3d78-4185-8ce0-0bbdbe9c2fb1"))
                .execute();
        System.out.println(exchangeResponse);
        if (exchangeResponse.isSuccessful()) {
            System.out.println("Success:");
            String accessToken = exchangeResponse.body().getAccessToken();
            tokenArray[0] = accessToken;
            Response<ItemStripeTokenCreateResponse> stripeResponse = plaidClient.service()
                    .itemStripeTokenCreate(
                            new ItemStripeTokenCreateRequest(accessToken, "jv4xqrnkEZc54kWAKnZ8IVZMKQRdgEt1qPNqN"))
                    .execute();

            if (stripeResponse.isSuccessful()) {
                String bankAccountToken = stripeResponse.body().getStripeBankAccountToken();
                tokenArray[1] = bankAccountToken;
            }
            return tokenArray;
        }
        return tokenArray;
    }

    // public static void main(String[] args) throws IOException {
    // plaidToStripe obj = new plaidToStripe();
    // String[] tokens = obj.getTokens();
    // System.out.println(tokens[0]);
    // System.out.println(tokens[1]);
    // }
}