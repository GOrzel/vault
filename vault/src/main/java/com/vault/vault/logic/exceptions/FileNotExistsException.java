package com.vault.vault.logic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by User on 2018-11-19.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class FileNotExistsException extends RuntimeException{
    public FileNotExistsException(String message) {
        super(message);
    }

    public FileNotExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
