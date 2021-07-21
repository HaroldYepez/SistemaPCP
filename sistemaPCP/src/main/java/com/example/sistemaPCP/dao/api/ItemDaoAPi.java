package com.example.sistemaPCP.dao.api;

import com.example.sistemaPCP.model.Item;

import org.springframework.data.repository.CrudRepository;

public interface ItemDaoAPi extends CrudRepository<Item, Long> {

}
