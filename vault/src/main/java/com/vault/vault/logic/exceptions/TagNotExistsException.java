package com.vault.vault.logic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by User on 2018-11-19.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class TagNotExistsException extends RuntimeException{
    public TagNotExistsException(String message) {
        super(message);
    }

    public TagNotExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}