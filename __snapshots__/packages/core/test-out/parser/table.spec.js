exports['table() table(no trailing comma) Parse "" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 0
    },
    "children": []
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 0
      },
      "message": "Expected “{”",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ "foo" : "bar"   "baz" : "qux" }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 33
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 18
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      },
      {
        "type": "pair",
        "range": {
          "start": 18,
          "end": 32
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 18,
              "end": 23
            },
            "value": "baz",
            "valueMap": {
              "outerRange": {
                "start": 19,
                "end": 22
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 26,
              "end": 31
            },
            "value": "qux",
            "valueMap": {
              "outerRange": {
                "start": 27,
                "end": 30
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 18,
            "end": 23
          },
          "value": "baz",
          "valueMap": {
            "outerRange": {
              "start": 19,
              "end": 22
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 24,
          "end": 25
        },
        "value": {
          "type": "string",
          "range": {
            "start": 26,
            "end": 31
          },
          "value": "qux",
          "valueMap": {
            "outerRange": {
              "start": 27,
              "end": 30
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 18,
        "end": 18
      },
      "message": "Expected “,”",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ "foo" : "bar" , "baz" : "qux" , }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 35
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 17
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 16,
          "end": 17
        }
      },
      {
        "type": "pair",
        "range": {
          "start": 18,
          "end": 33
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 18,
              "end": 23
            },
            "value": "baz",
            "valueMap": {
              "outerRange": {
                "start": 19,
                "end": 22
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 26,
              "end": 31
            },
            "value": "qux",
            "valueMap": {
              "outerRange": {
                "start": 27,
                "end": 30
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 18,
            "end": 23
          },
          "value": "baz",
          "valueMap": {
            "outerRange": {
              "start": 19,
              "end": 22
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 24,
          "end": 25
        },
        "value": {
          "type": "string",
          "range": {
            "start": 26,
            "end": 31
          },
          "value": "qux",
          "valueMap": {
            "outerRange": {
              "start": 27,
              "end": 30
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 32,
          "end": 33
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 32,
        "end": 33
      },
      "message": "Trailing separation",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ "foo" : "bar" , "baz" : "qux" }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 33
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 17
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 16,
          "end": 17
        }
      },
      {
        "type": "pair",
        "range": {
          "start": 18,
          "end": 32
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 18,
              "end": 23
            },
            "value": "baz",
            "valueMap": {
              "outerRange": {
                "start": 19,
                "end": 22
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 26,
              "end": 31
            },
            "value": "qux",
            "valueMap": {
              "outerRange": {
                "start": 27,
                "end": 30
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 18,
            "end": 23
          },
          "value": "baz",
          "valueMap": {
            "outerRange": {
              "start": 19,
              "end": 22
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 24,
          "end": 25
        },
        "value": {
          "type": "string",
          "range": {
            "start": 26,
            "end": 31
          },
          "value": "qux",
          "valueMap": {
            "outerRange": {
              "start": 27,
              "end": 30
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      }
    ]
  },
  "errors": []
}

exports['table() table(no trailing comma) Parse "{ "foo" : "bar" , "baz" : }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 27
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 17
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 16,
          "end": 17
        }
      },
      {
        "type": "pair",
        "range": {
          "start": 18,
          "end": 26
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 18,
              "end": 23
            },
            "value": "baz",
            "valueMap": {
              "outerRange": {
                "start": 19,
                "end": 22
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 18,
            "end": 23
          },
          "value": "baz",
          "valueMap": {
            "outerRange": {
              "start": 19,
              "end": 22
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 24,
          "end": 25
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 26,
        "end": 26
      },
      "message": "Expected a value",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ "foo" : "bar" , "baz" }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 25
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 17
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 16,
          "end": 17
        }
      },
      {
        "type": "pair",
        "range": {
          "start": 18,
          "end": 24
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 18,
              "end": 23
            },
            "value": "baz",
            "valueMap": {
              "outerRange": {
                "start": 19,
                "end": 22
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 18,
            "end": 23
          },
          "value": "baz",
          "valueMap": {
            "outerRange": {
              "start": 19,
              "end": 22
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 24,
        "end": 24
      },
      "message": "Expected “:”",
      "severity": 3
    },
    {
      "range": {
        "start": 24,
        "end": 24
      },
      "message": "Expected a value",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ "foo" : "bar" , }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 19
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 17
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 16,
          "end": 17
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 16,
        "end": 17
      },
      "message": "Trailing separation",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ "foo" : "bar" }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 17
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 16
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      }
    ]
  },
  "errors": []
}

exports['table() table(no trailing comma) Parse "{ "foo" : }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 11
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 10
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 10,
        "end": 10
      },
      "message": "Expected a value",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ "foo" }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 9
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 8
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 8,
        "end": 8
      },
      "message": "Expected “:”",
      "severity": 3
    },
    {
      "range": {
        "start": 8,
        "end": 8
      },
      "message": "Expected a value",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ : "bar" }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 11
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 10
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 4,
              "end": 9
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 5,
                "end": 8
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "sep": {
          "start": 2,
          "end": 3
        },
        "value": {
          "type": "string",
          "range": {
            "start": 4,
            "end": 9
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 5,
              "end": 8
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 2,
        "end": 2
      },
      "message": "Expected a key",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ : }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 5
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 4
        },
        "sep": {
          "start": 2,
          "end": 3
        }
      }
    ]
  },
  "errors": [
    {
      "range": {
        "start": 2,
        "end": 2
      },
      "message": "Expected a key",
      "severity": 3
    },
    {
      "range": {
        "start": 4,
        "end": 4
      },
      "message": "Expected a value",
      "severity": 3
    }
  ]
}

exports['table() table(no trailing comma) Parse "{ }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 3
    },
    "children": []
  },
  "errors": []
}

exports['table() table(no trailing comma) Parse "{" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 1
    },
    "children": []
  },
  "errors": [
    {
      "range": {
        "start": 1,
        "end": 1
      },
      "message": "Expected “}”",
      "severity": 3
    }
  ]
}

exports['table() table(trailing comma) Parse "{ "foo" : "bar" , "baz" : "qux" , }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 35
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 17
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 16,
          "end": 17
        }
      },
      {
        "type": "pair",
        "range": {
          "start": 18,
          "end": 33
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 18,
              "end": 23
            },
            "value": "baz",
            "valueMap": {
              "outerRange": {
                "start": 19,
                "end": 22
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 26,
              "end": 31
            },
            "value": "qux",
            "valueMap": {
              "outerRange": {
                "start": 27,
                "end": 30
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 18,
            "end": 23
          },
          "value": "baz",
          "valueMap": {
            "outerRange": {
              "start": 19,
              "end": 22
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 24,
          "end": 25
        },
        "value": {
          "type": "string",
          "range": {
            "start": 26,
            "end": 31
          },
          "value": "qux",
          "valueMap": {
            "outerRange": {
              "start": 27,
              "end": 30
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 32,
          "end": 33
        }
      }
    ]
  },
  "errors": []
}

exports['table() table(trailing comma) Parse "{ "foo" : "bar" , "baz" : "qux" }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 33
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 17
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 16,
          "end": 17
        }
      },
      {
        "type": "pair",
        "range": {
          "start": 18,
          "end": 32
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 18,
              "end": 23
            },
            "value": "baz",
            "valueMap": {
              "outerRange": {
                "start": 19,
                "end": 22
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 26,
              "end": 31
            },
            "value": "qux",
            "valueMap": {
              "outerRange": {
                "start": 27,
                "end": 30
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 18,
            "end": 23
          },
          "value": "baz",
          "valueMap": {
            "outerRange": {
              "start": 19,
              "end": 22
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 24,
          "end": 25
        },
        "value": {
          "type": "string",
          "range": {
            "start": 26,
            "end": 31
          },
          "value": "qux",
          "valueMap": {
            "outerRange": {
              "start": 27,
              "end": 30
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      }
    ]
  },
  "errors": []
}

exports['table() table(trailing comma) Parse "{ "foo" : "bar" , }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 19
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 17
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "end": {
          "start": 16,
          "end": 17
        }
      }
    ]
  },
  "errors": []
}

exports['table() table(trailing comma) Parse "{ "foo" : "bar" }" 1'] = {
  "node": {
    "type": "table",
    "range": {
      "start": 0,
      "end": 17
    },
    "children": [
      {
        "type": "pair",
        "range": {
          "start": 2,
          "end": 16
        },
        "children": [
          {
            "type": "string",
            "range": {
              "start": 2,
              "end": 7
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 3,
                "end": 6
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          {
            "type": "string",
            "range": {
              "start": 10,
              "end": 15
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        ],
        "key": {
          "type": "string",
          "range": {
            "start": 2,
            "end": 7
          },
          "value": "foo",
          "valueMap": {
            "outerRange": {
              "start": 3,
              "end": 6
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        },
        "sep": {
          "start": 8,
          "end": 9
        },
        "value": {
          "type": "string",
          "range": {
            "start": 10,
            "end": 15
          },
          "value": "bar",
          "valueMap": {
            "outerRange": {
              "start": 11,
              "end": 14
            },
            "innerRange": {
              "start": 0,
              "end": 3
            },
            "pairs": []
          }
        }
      }
    ]
  },
  "errors": []
}