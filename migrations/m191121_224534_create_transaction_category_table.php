<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%transaction_category}}`.
 */
class m191121_224534_create_transaction_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%transaction_category}}', [
            'transaction_id' => $this->primaryKey(),
            'category_id' => $this->integer()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%transaction_category}}');
    }
}
