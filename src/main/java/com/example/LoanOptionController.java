package com.example;

import java.util.Arrays;
import java.util.List;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loans")
public class LoanOptionController {
    private LoanOptionRepository repository;

    @Autowired
    public LoanOptionController(LoanOptionRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<LoanOption> get(@PathVariable("id") Long id) {
        LoanOption loan = repository.findOne(id);
        if (null == loan)
            return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    }

    // @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    // public ResponseEntity<LoanOption> delete(@PathVariable("id") Long id) {
    // LoanOption loan = repository.findOne(id);
    // if (loan == null)
    // return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);
    // repository.delete(loan);
    // return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    // }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<LoanOption> update(@RequestBody LoanOption loan) {
        repository.save(loan);
        return get(loan.getId());
    }

    // TODO: update the next payment date
    @RequestMapping(value = "/{id}/paynow", method = RequestMethod.POST)
    public ResponseEntity<LoanOption> payLoan(@PathVariable("id") Long id, @RequestBody Loginuser user)
            throws StripeException {
        if (user.isAutopay()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        LoanOption loan = repository.findOne(id);
        Stripe.apiKey = "sk_test_3gCJKshMgnQKkUBMp6tGu0O400rZYqWFNG"; // change put into heroku
        // doublecheck that *100 is correct and check that it is actually casting
        // properly
        ChargeCreateParams params = ChargeCreateParams.builder().setAmount((long) (loan.getNextPaymentAmount() * 100))
                .setCurrency("usd").setCustomer(user.getStripeCustomerId())
                .setDescription("Charge for: " + user.getFullName() + "for payment date: " + loan.getNextPaymentDate())
                .setReceiptEmail(user.getUserName()).build();
        try {
            Charge charge = Charge.create(params);
            String chargeId = charge.getId();
            // Update the array of charge ids
            String[] newPastChargeObj = Arrays.copyOf(loan.getPastChargeObj(), loan.getPastChargeObj().length + 1);
            newPastChargeObj[newPastChargeObj.length - 1] = chargeId;
            loan.setPastChargeObj(newPastChargeObj);

            // Update the amount paid
            Double newAmountPaid = loan.getAmountPaid() + loan.getNextPaymentAmount();
            loan.setAmountPaid(newAmountPaid);

            // Update the array of past payment dates
            String[] newPastDatesPaid = Arrays.copyOf(loan.getPastDatesPaid(), loan.getPastDatesPaid().length + 1);
            newPastDatesPaid[newPastDatesPaid.length - 1] = loan.getNextPaymentDate();
            loan.setPastDatesPaid(newPastDatesPaid);

            // update nextpayment date here

            repository.save(loan);
        } catch (Exception e) {
            System.out.println("Charge failed");
            throw new RuntimeException(e);
        }

        return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    }

    @RequestMapping
    public List<LoanOption> all() {
        return repository.findAll();
    }
}
