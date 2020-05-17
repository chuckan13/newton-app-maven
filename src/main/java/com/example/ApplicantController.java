package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applicants")
public class ApplicantController {
    private ApplicantRepository repository;

    @Autowired
    public ApplicantController(ApplicantRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Applicant> get(@PathVariable("id") Long id) {
        Applicant user = repository.findOne(id);
        if (null == user)
            return new ResponseEntity<Applicant>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Applicant>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Applicant> delete(@PathVariable("id") Long id) {
        Applicant user = repository.findOne(id);
        if (user == null)
            return new ResponseEntity<Applicant>(HttpStatus.NOT_FOUND);
        repository.delete(user);
        return new ResponseEntity<Applicant>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Applicant> update(@RequestBody Applicant user) {
        repository.save(user);
        return get(user.getId());
    }

    @RequestMapping
    public List<Applicant> all() {
        return repository.findAll();
    }
}
