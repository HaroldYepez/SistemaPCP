package com.example.sistemaPCP.Commons;

import java.io.Serializable;
import java.util.List;

public interface GenericServiceAPi<T, ID extends Serializable> {
    T save(T entity);

    void delete(ID id);

    T get(ID id);

    List<T> getAll();

}
