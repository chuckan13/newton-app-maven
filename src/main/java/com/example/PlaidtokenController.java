package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plaidtokens")
public class PlaidtokenController {
    private PlaidtokenRepository repository;

    @Autowired
    public PlaidtokenController(PlaidtokenRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Plaidtoken> get(@PathVariable("id") Long id) {
        Plaidtoken token = repository.findOne(id);
        if (null == token)
            return new ResponseEntity<Plaidtoken>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Plaidtoken>(token, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Plaidtoken> delete(@PathVariable("id") Long id) {
        Plaidtoken token = repository.findOne(id);
        if (token == null)
            return new ResponseEntity<Plaidtoken>(HttpStatus.NOT_FOUND);
        repository.delete(token);
        return new ResponseEntity<Plaidtoken>(token, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Plaidtoken> update(@RequestBody Plaidtoken token) {
        repository.save(token);
        return get(token.getId());
    }

    @RequestMapping
    public List<Plaidtoken> all() {
        return repository.findAll();
    }
}