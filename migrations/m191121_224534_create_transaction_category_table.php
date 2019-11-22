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
            'transaction_id' => $this->integer()->notNull(),
            'category_id' => $this->integer()->notNull()
        ]);

        $this->addPrimaryKey(
            'pk_transaction_category',
            '{{%transaction_category}}',
            ['transaction_id', 'category_id']);

        $this->addForeignKey(
            'fk_transaction_category_transaction_id',
            '{{%transaction_category}}',
            'transaction_id',
            'transaction',
            'id',
            'CASCADE');

        $this->addForeignKey(
            'fk_transaction_category_category_id',
            '{{%transaction_category}}',
            'category_id',
            'category',
            'id',
            'CASCADE');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk_transaction_category_transaction_id', '{{%transaction_category}}');
        $this->dropForeignKey('fk_transaction_category_category_id', '{{%transaction_category}}');

        $this->dropTable('{{%transaction_category}}');
    }
}
