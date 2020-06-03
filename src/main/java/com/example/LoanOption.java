package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

// import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import javax.persistence.Column;

@Entity
public class LoanOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "amount_total")
    private double amountTotal;
    @Column(name = "amount_paid")
    private double amountPaid;
    @Column(name = "apr")
    private double apr;
    @Column(name = "months_total")
    private int monthsTotal;
    @Column(name = "next_payment_date")
    private String nextPaymentDate;
    @Column(name = "medical_center")
    private String medicalCenter;
    @Column(name = "processed_date")
    private String processedDate;
    @Type(type = "string-array")
    @Column(name = "past_dates_paid", columnDefinition = "text[]") // @JsonFormat(shape=JsonFormat.Shape.ARRAY)
    private String[] pastDatesPaid;

    public int getUserId() {
        return this.userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getAmountTotal() {
        return this.amountTotal;
    }

    public void setAmountTotal(double amountTotal) {
        this.amountTotal = amountTotal;
    }

    public double getAmountPaid() {
        return this.amountPaid;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public double getApr() {
        return this.apr;
    }

    public void setApr(double apr) {
        this.apr = apr;
    }

    public int getMonthsTotal() {
        return this.monthsTotal;
    }

    public void setMonthsTotal(int months) {
        this.monthsTotal = months;
    }

    public String getNextPaymentDate() {
        return this.nextPaymentDate;
    }

    public void setNextPaymentDate(String nextPaymentDate) {
        this.nextPaymentDate = nextPaymentDate;
    }

    public String getMedicalCenter() {
        return this.medicalCenter;
    }

    public void setMedicalCenter(String medicalCenter) {
        this.medicalCenter = medicalCenter;
    }

    public String getProcessedDate() {
        return this.processedDate;
    }

    public void setProcessedDate(String processedDate) {
        this.processedDate = processedDate;
    }

    public String[] getPastDatesPaid() {
        return this.pastDatesPaid;
    }

    public void setPastDatesPaid(String[] pastDatesPaid) {
        this.pastDatesPaid = pastDatesPaid;
    }

    public Long getId() {
        return id;
    }

    public void updateParameters(LoanOption other) {
        this.amountTotal = other.getAmountTotal();
        this.apr = other.getApr();
        this.monthsTotal = other.getMonthsTotal();
        this.nextPaymentDate = other.getNextPaymentDate();
        this.amountPaid = other.getAmountPaid();
        this.pastDatesPaid = other.getPastDatesPaid();
        this.medicalCenter = other.getMedicalCenter();
        this.processedDate = other.getProcessedDate();
        this.userId = other.getUserId();
    }
}