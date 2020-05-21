package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Plaidtoken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "public_token")
    private String publicToken;

    @Column(name = "accound_id")
    private String accountId;

    public Long getId() {
        return id;
    }

    public String getPublicToken() {
        return publicToken;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setPublicToken(String publicToken) {
        this.publicToken = publicToken;
    }

    public void setAccoundId(String accoundId) {
        this.accountId = accoundId;
    }

    public void updateParameters(Plaidtoken other) {
        this.publicToken = other.getPublicToken();
        this.accountId = other.getAccountId();
    }
}