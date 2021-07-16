package com.example.sistemaPCP.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.sistemaPCP.Model.*;
import com.example.sistemaPCP.Service.api.*;

@Controller
@RequestMapping("/home")
public class UnidadController {

    @Autowired
    private UnidadService unidadServiceAPI;

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("list", unidadServiceAPI.getAll());
        return "index";
    }

    @GetMapping("/save/{id}")
    public String showSave(@PathVariable("id") Long id, Model model) {
        if (id != null && id != 0) {
            model.addAttribute("unidad", unidadServiceAPI.get(id));
        } else {
            model.addAttribute("unidad", new Unidad());
        }
        return "save";
    }

    @PostMapping("/save")
    public String save(Unidad unidad, Model model) {
        unidadServiceAPI.save(unidad);
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id, Model model) {
        unidadServiceAPI.delete(id);

        return "redirect:/";
    }

}
