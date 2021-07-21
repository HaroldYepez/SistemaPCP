package com.example.sistemaPCP.Service.impl;

import com.example.sistemaPCP.Commons.GenericServiceImpl;
import com.example.sistemaPCP.Service.api.ItemService;
import com.example.sistemaPCP.dao.api.ItemDaoAPi;
import com.example.sistemaPCP.model.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl extends GenericServiceImpl<Item, Long> implements ItemService {
    @Autowired
    private ItemDaoAPi itemDaoAPi;

    @Override
    public CrudRepository<Item, Long> getDao() {
        return itemDaoAPi;
    }
}
