package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {
    private ResponseRepository repository;

    @Autowired
    public ResponseController(ResponseRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Response> get(@PathVariable("id") Long id) {
        Response response = repository.findOne(id);
        if (null == response)
            return new ResponseEntity<Response>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Response> update(@RequestBody Response response) {
        repository.save(response);
        return get(response.getId());
    }
}
