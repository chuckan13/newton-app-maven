package com.example;

import java.util.List;
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

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<LoanOption> delete(@PathVariable("id") Long id) {
        LoanOption loan = repository.findOne(id);
        if (loan == null)
            return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);
        repository.delete(loan);
        return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<LoanOption> update(@RequestBody LoanOption loan) {
        repository.save(loan);
        return get(loan.getId());
    }

    @RequestMapping
    public List<LoanOption> all() {
        return repository.findAll();
    }
}
