package com.example;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
@Entity
public class Loginuser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "role")
    private String role;
    @Column(name = "password")
    private String password;
    @Column(name = "loan_option1")
    private String loanOption1;
    @Column(name = "loan_option2")
    private String loanOption2;
    @Column(name = "loan_option3")
    private String loanOption3;
    public Long getId() {
        return id;
    }
    public String getFullName() {
        return fullName;
    }
    public String getUserName() {
        return userName;
    }
    public String getRole() {
        return role;
    }
    public String getPassword() {
        return password;
    }
    public String getLoanOption1() {
        return this.loanOption1;
    }
    public String getLoanOption2() {
        return this.loanOption2;
    }
    public String getLoanOption3() {
        return this.loanOption3;
    }
    public void setName(String fullName) {
        this.fullName = fullName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setLoanOption1(String loanOption1) {
        this.loanOption1 = loanOption1;
    }
    public void setLoanOption2(String loanOption2) {
        this.loanOption2 = loanOption2;
    }
    public void setLoanOption3(String loanOption3) {
        this.loanOption3 = loanOption3;
    }
    public void updateParameters(Loginuser other) {
        this.fullName = other.getFullName();
        this.userName = other.getUserName();
        this.role = other.getRole();
        this.password = other.getPassword();
        this.loanOption1 = other.getLoanOption1();
        this.loanOption2 = other.getLoanOption2();
        this.loanOption3 = other.getLoanOption3();
    }
}