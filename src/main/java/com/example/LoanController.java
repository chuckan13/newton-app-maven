package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loans")
public class LoanController {
    private LoanRepository repository;

    @Autowired
    public LoanController(LoanRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Loan> get(@PathVariable("id") Long id) {
        Loan loan = repository.findOne(id);
        if (null == loan)
            return new ResponseEntity<Loan>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Loan>(loan, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Loan> delete(@PathVariable("id") Long id) {
        Loan loan = repository.findOne(id);
        if (loan == null)
            return new ResponseEntity<Loan>(HttpStatus.NOT_FOUND);
        repository.delete(loan);
        return new ResponseEntity<Loan>(loan, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Loan> update(@RequestBody Loan loan) {
        repository.save(loan);
        return get(loan.getId());
    }

    @RequestMapping
    public List<Loan> all() {
        return repository.findAll();
    }
}
