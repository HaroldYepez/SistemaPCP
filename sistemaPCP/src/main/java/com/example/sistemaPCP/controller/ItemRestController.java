package com.example.sistemaPCP.controller;

import java.util.List;

import com.example.sistemaPCP.Service.api.ItemService;
import com.example.sistemaPCP.model.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/item/")
@CrossOrigin("*")
public class ItemRestController {
    @Autowired
    private ItemService itemService;

    @GetMapping(value = "/all")
    public List<Item> getAll() {
        return itemService.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public Item find(@PathVariable Long id) {
        return itemService.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Item> save(@RequestBody Item item) {
        Item obj = itemService.save(item);
        return new ResponseEntity<Item>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Item> delete(@PathVariable Long id) {
        Item item = itemService.get(id);
        if (item != null) {
            itemService.delete(id);
        } else {
            return new ResponseEntity<Item>(item, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Item>(item, HttpStatus.OK);

    }
}
